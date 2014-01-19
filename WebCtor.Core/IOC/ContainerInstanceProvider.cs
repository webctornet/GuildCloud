using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using log4net;

namespace WebCtor.Core.IOC
{
    public static class ContainerInstanceProvider
    {
        /// <summary>
        /// See GetContainerInstance(Assembly)
        /// </summary>
        /// <returns></returns>
        public static IContainer GetContainerInstance()
        {
            return GetContainerInstance(Assembly.GetCallingAssembly());
        }

        /// <summary>
        /// Scans current domain included previously unloaded assemblies for IRegister implementations.
        /// Assemblies in common will be called first, followed by any others.
        /// Calling assembly will be last
        /// </summary>
        /// <param name="callingAssembly">
        /// Used to determine which IRegister implementors should be run last.
        /// Useful when you need to override some previous registrations
        /// </param>
        /// <returns>An autofac IContainer</returns>
        public static IContainer GetContainerInstance(Assembly callingAssembly)
        {
            Contract.Ensures(Contract.Result<IContainer>() != null);

            var log = LogManager.GetLogger(Constants.Exceptions.DefaultLogName);
            var containerBuilder = new ContainerBuilder();
            var types = TypeManager.FindTypesThatExtend<IIocRegister>(log);
            foreach (var type in types)
            {
                Trace.WriteLine("Executing IIocRegister.Register method within type " + type);
                ((IIocRegister)Activator.CreateInstance(type)).Register(containerBuilder);
            }

            var container = containerBuilder.Build();

            return container;
        }
    }

}
