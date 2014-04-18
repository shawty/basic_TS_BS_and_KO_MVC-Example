using System;
using System.Linq;
using System.Web.Mvc;
using MvcExampleApp.Models;
using PretendData.Entities;

namespace MvcExampleApp.Controllers
{
  public class AjaxController : Controller
  {
    public ActionResult GetAllLinks()
    {
      return Json(PretendData.LinkSource.GetAll(), JsonRequestBehavior.AllowGet);
    }

    public ActionResult GetAllPeople()
    {
      return Json(PretendData.DataSource.GetAll(), JsonRequestBehavior.AllowGet);
    }

    public ActionResult GetOnePerson(int id)
    {
      return Json(PretendData.DataSource.GetById(id), JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult UpdateOnePerson(PersonObject personToUpdate)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      PretendData.DataSource.Update(personToUpdate);

      var response = new UpdateResponse { Status = "OK", Message = "" };
      //var response = new UpdateResponse { Status = "ERROR", Message = "Record failed to update beacuse it's broken." };

      return Json(response);
    }

    [HttpPost]
    public ActionResult DeleteOnePerson(int id)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      PretendData.DataSource.DeleteById(id);

      var response = new UpdateResponse { Status = "OK", Message = "" };
      //var response = new UpdateResponse { Status = "ERROR", Message = "Record failed to update beacuse it's broken." };

      return Json(response);
    }

    [HttpPost]
    public ActionResult AddNewPerson(PersonObject personToAdd)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      PretendData.DataSource.AddNew(personToAdd);

      var response = new UpdateResponse { Status = "OK", Message = "" };
      //var response = new UpdateResponse { Status = "ERROR", Message = "Record failed to update beacuse it's broken." };

      return Json(response);
    }

  }
}