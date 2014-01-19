using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using log4net;

namespace WebCtor.Core
{
    public interface ITypeManager
    {
        IEnumerable<Assembly> FindAssembliesContainingInterface<T>();
        TAttribute GetClassAttribute<TAttribute, TX>() where TAttribute : Attribute;
        TAttribute GetClassAttribute<TAttribute>(Type type) where TAttribute : Attribute;
        Type GetGenericTypeArgumentFromBase<TBase>(Type typeToCheck);
    }

    public class TypeManager : ITypeManager
    {
        private readonly ILog _log;
        public static bool AllAssembliesLoaded = false;

        public TypeManager(ILog log)
        {
            _log = log;
            Init();
        }

        private void Init()
        {
            // Load all the dll's in the bin
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var di = new DirectoryInfo(path);

            foreach (var file in di.GetFiles("*.dll"))
                Assembly.LoadFile(file.FullName);

            AllAssembliesLoaded = true;
        }

        public IEnumerable<Assembly> FindAssembliesContainingInterface<T>()
        {
            try
            {
                // Look for the interface
                var types = AppDomain.CurrentDomain.GetAssemblies()
                                     .SelectMany(s => s.GetTypes())
                                     .Where(p => typeof(T).IsAssignableFrom(p));

                var assemblies = types.Select(t => t.Assembly).Distinct();
                return assemblies.ToList(); // fire the Linq here so we can capture the error.
            }
            catch (Exception exception)
            {
                if (exception is System.Reflection.ReflectionTypeLoadException)
                {
                    var typeLoadException = exception as ReflectionTypeLoadException;
                    var loaderExceptions = typeLoadException.LoaderExceptions;
                    foreach (var ex in loaderExceptions)
                        _log.Error(ex);
                }
                throw;
            }
        }

        public static Type FindTypeByFullName(string fullName)
        {
            var type = AppDomain.CurrentDomain.GetAssemblies()
                                .SelectMany(s => s.GetTypes()).FirstOrDefault(p => p.FullName == fullName);
            return type;
        }

        public TAttribute GetClassAttribute<TAttribute, TX>() where TAttribute : Attribute
        {
            return typeof(TX).GetCustomAttributes(typeof(TAttribute), true).FirstOrDefault() as TAttribute;
        }

        public TAttribute GetClassAttribute<TAttribute>(Type type) where TAttribute : Attribute
        {
            return type.GetCustomAttributes(typeof(TAttribute), true).FirstOrDefault() as TAttribute;
        }

        public Type GetGenericTypeArgumentFromBase<TBase>(Type typeToCheck)
        {
            var type = typeToCheck;
            if (!typeToCheck.IsGenericType)
            {
                if (typeToCheck.BaseType != null && !typeToCheck.BaseType.IsGenericType)
                {
                    throw new InvalidOperationException("T must be a generic type with generic arguments.");
                }
                else
                {
                    type = typeToCheck.BaseType;
                }
            }


            var typeParameters = type.GetGenericArguments();
            return typeParameters.FirstOrDefault(tParam => tParam.IsSubclassOf(typeof(TBase)));
        }

        /// <summary>
        /// BpeProducts.Common.Ioc
        /// </summary>
        /// <typeparam name="TBaseType"></typeparam>
        /// <returns></returns>
        public static IEnumerable<Type> FindTypesThatExtend<TBaseType>(ILog log)
        {
            if (!AllAssembliesLoaded)
                (new TypeManager(log)).Init();

            return FindTypesThatExtend<TBaseType>(AppDomain.CurrentDomain.GetAssemblies());
        }

        /// <summary>
        /// BpeProducts.Common.Ioc
        /// </summary>
        /// <typeparam name="TBaseType"></typeparam>
        /// <param name="assemblies"></param>
        /// <returns></returns>
        public static IEnumerable<Type> FindTypesThatExtend<TBaseType>(IEnumerable<Assembly> assemblies)
        {
            return from assembly in assemblies
                   from type in GetTypesIgnoringError(assembly)
                   where typeof(TBaseType).IsAssignableFrom(type)
                   where type != typeof(TBaseType)
                   where type.IsClass
                   where !type.IsAbstract
                   select type;
        }

        /// <summary>
        /// BpeProducts.Common.Ioc
        /// </summary>
        /// <param name="assembly"></param>
        /// <returns></returns>
        [DebuggerNonUserCode]
        private static IEnumerable<Type> GetTypesIgnoringError(Assembly assembly)
        {
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException)
            {
#if DEBUG
                Trace.WriteLine("Exception when retrieving types from assembly " + assembly);
#endif
                return Enumerable.Empty<Type>();
            }
        }
    }

}
