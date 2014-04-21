using System;
using System.Linq;
using PretendData.Entities;

namespace MvcExampleApp.Models
{
  public class UpdateResponse
  {
    public bool Error { get; set; }
    public string Message { get; set; }
    public PersonObject attachedObject { get; set; }
  }
}