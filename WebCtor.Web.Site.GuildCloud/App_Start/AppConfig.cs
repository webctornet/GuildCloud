using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using WebCtor.Core.IOC;

namespace WebCtor.Web.Site.GuildCloud
{
    public static class AppConfig
    {
        public static IContainer Configure(HttpConfiguration httpConfiguration)
        {
            // IOC initiation happens here
            var container = ContainerInstanceProvider.GetContainerInstance(Assembly.GetCallingAssembly());
            // Configure the site
            Configure(httpConfiguration, container);
            // Return the contianer
            return container;
        }

        private static void Configure(HttpConfiguration httpConfiguration, IContainer container)
        {
            ConfigureLogging();
            ConfigureDependencyResolver(httpConfiguration, container);
            ConfigureSite();
            ConfigureBundles(BundleTable.Bundles);
            ConfigureRoutes(RouteTable.Routes);
            ConfigureWebApi(httpConfiguration);
        }

        #region Bundles

        private static void ConfigureBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                 "~/Scripts/lib/modernizr/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                 "~/Scripts/lib/jquery/*.js",
                 "~/Scripts/lib/jquery/i18n/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/theme/plenius").Include(
                "~/Scripts/theme/plenius/form_validation.js",
                "~/Scripts/theme/plenius/main.js",
                "~/Scripts/theme/plenius/carousel.js",
                "~/Scripts/theme/plenius/filter.js",
                "~/Scripts/theme/plenius/settings.js"));

            bundles.Add(new StyleBundle("~/bundles/plenius").Include(
                "~/App_Themes/Plenius/bootstrap.css",
                "~/App_Themes/Plenius/bootstrap-responsive.css",
                "~/App_Themes/Plenius/prettyPhoto.css", 
                "~/App_Themes/Plenius/style.css",
                "~/App_Themes/Plenius/color_style/yellow_items.css",
                "~/App_Themes/Plenius/bg_style/black_bg.css",
                "~/App_Themes/Plenius/settings_style.css"));
        }

        #endregion

        #region DependencyResolver

        private static void ConfigureDependencyResolver(HttpConfiguration httpConfiguration, IContainer container)
        {
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container); ;
        }

        #endregion

        #region Logging

        private static void ConfigureLogging()
        {
            log4net.Config.XmlConfigurator.Configure(new System.IO.FileInfo(HttpRuntime.AppDomainAppPath + "log4net.config"));
        }

        #endregion

        #region Site

        private static void ConfigureSite()
        {
            AreaRegistration.RegisterAllAreas();
        }

        #endregion

        #region Routes

        private static void ConfigureRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        #endregion

        #region WebApi

        private static void ConfigureWebApi(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        #endregion

    }
}