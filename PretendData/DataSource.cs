using System;
using System.Collections.Generic;
using System.Linq;
using PretendData.Entities;

namespace PretendData
{
  public static class DataSource
  {
    private static readonly List<PersonObject> _theData = new List<PersonObject>
    {
      new PersonObject { RecordId = 1, FirstName = "Peter", SecondName = "Shaw", EmailAddress = "peter.shaw@example.com" },
      new PersonObject { RecordId = 2, FirstName = "Fred", SecondName = "Blogs", EmailAddress = "fred.bloggs@example.com" },
      new PersonObject { RecordId = 3, FirstName = "Jane", SecondName = "Doe", EmailAddress = "jane.doe@example.com" },
      new PersonObject { RecordId = 4, FirstName = "Alan", SecondName = "Person", EmailAddress = "a.person@example.com" }
    };

    public static List<PersonObject> GetAll()
    {
      return _theData.OrderBy(x => x.RecordId).ToList();

    }

    public static PersonObject GetById(int id)
    {
      return _theData.FirstOrDefault(x => x.RecordId == id);

    }

    public static void DeleteById(int id)
    {
      _theData.RemoveAll(x => x.RecordId == id);

    }

    public static void Update(PersonObject personDetails)
    {
      var thePerson = _theData.SingleOrDefault(x => x.RecordId == personDetails.RecordId);
      if(null != thePerson)
      {
        thePerson.FirstName = personDetails.FirstName;
        thePerson.SecondName = personDetails.SecondName;
        thePerson.EmailAddress = personDetails.EmailAddress;
      }

    }

    public static void AddNew(PersonObject personDetails)
    {
      int newId = _theData.Max(x => x.RecordId) + 1;
      personDetails.RecordId = newId;
      _theData.Add(personDetails);

    }

  }
}
