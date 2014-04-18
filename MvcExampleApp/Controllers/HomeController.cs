using System;
using System.Linq;
using System.Web.Mvc;

namespace MvcExampleApp.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult Links()
    {
      return View();
    }

  }
}