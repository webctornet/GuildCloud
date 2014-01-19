
using Autofac;

namespace WebCtor.Core.IOC
{
    public interface IIocRegister
    {
        void Register(ContainerBuilder containerBuilder);
    }
}
