using System;
using System.Collections.Generic;
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
      var data = PretendData.DataSource.GetAll();
      //var data = new List<PersonObject>();
      if(null == data)
      {
        data = new List<PersonObject>();
      }

      return Json(data, JsonRequestBehavior.AllowGet);
    }

    public ActionResult GetOnePerson(int id)
    {
      var data = PretendData.DataSource.GetById(id);
      if(null == data)
      {
        return new HttpNotFoundResult();
      }

      return Json(data, JsonRequestBehavior.AllowGet);
    }

    [HttpPost]
    public ActionResult UpdateOnePerson(PersonObject personToUpdate)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      var updatedPerson = PretendData.DataSource.Update(personToUpdate);

      UpdateResponse response;

      if(null != updatedPerson)
      {
        response = new UpdateResponse { Error = false, Message = "", attachedObject = updatedPerson };
      }
      else
      {
        response = new UpdateResponse { Error = true, Message = "Record failed to update beacuse it's broken.", attachedObject = null };
      }
      
      return Json(response);
    }

    [HttpPost]
    public ActionResult DeleteOnePerson(int id)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      PretendData.DataSource.DeleteById(id);

      var response = new UpdateResponse { Error = false, Message = "" };
      //var response = new UpdateResponse { Status = "ERROR", Message = "Record failed to update beacuse it's broken." };

      return Json(response);
    }

    [HttpPost]
    public ActionResult AddNewPerson(PersonObject personToAdd)
    {
      // For the purposes of this example where just assuming everything works all of the time.
      // Ideally though, you'd want to return some kind of status from your data tier here
      var addedRecord = PretendData.DataSource.AddNew(personToAdd);

      var response = new UpdateResponse { Error = false, Message = "", attachedObject = addedRecord };
      //var response = new UpdateResponse { Error = true, Message = "Record failed to update beacuse it's broken.", attachedObject = null };

      return Json(response);
    }

  }
}