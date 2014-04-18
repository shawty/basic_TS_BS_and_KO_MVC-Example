using System;
using System.Collections.Generic;
using System.Linq;
using PretendData.Entities;

namespace PretendData
{
  public static class LinkSource
  {
    private static readonly List<LinkObject> _theData = new List<LinkObject>
    {
      new LinkObject { LinkId = 1, LinkText = "Shawty's Blog", LinkDestination = "http://shawtyds.wordpress.com" },
      new LinkObject { LinkId = 2, LinkText = "Bootstrap 3", LinkDestination = "http://getbootstrap.com" },
      new LinkObject { LinkId = 3, LinkText = "Knockout JS", LinkDestination = "http://knockoutjs.com/" },
      new LinkObject { LinkId = 4, LinkText = "Typescript", LinkDestination = "http://www.typescriptlang.org/" },
    };

    public static List<LinkObject> GetAll()
    {
      return _theData;

    }

  }
}
