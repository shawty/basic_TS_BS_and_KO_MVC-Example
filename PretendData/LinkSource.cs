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
      new LinkObject { LinkId = 1, LinkText = "Bootstrap 3", LinkDestination = "http://getbootstrap.com", Description = "Bootstrap 3 is Twitters latest incarnation of it's grid driven CSS & JS UI Framework.  Designed to be cross browser, and mobile first responsive, Bootstrap handles pretty much anything you'll ever need for layout related tasks in your app's user interface.", ThumbNail = "images/bootstrap.png" },
      new LinkObject { LinkId = 2, LinkText = "Knockout JS", LinkDestination = "http://knockoutjs.com/", Description = "Initially written by Steve Sanderson of Microsoft, knockout JS has gone on to become a powerhouse in MVC & MVVM based data driven web UI's, it combines the ease of declaritive binding, but hides some serious power under the covers when you need to 'model' outside the box.  Knockout may not be as easy to use as the likes of Angular, but one mastered you'll wonder what the fuss was about.", ThumbNail = "images/knockout.png" },
      new LinkObject { LinkId = 3, LinkText = "Typescript", LinkDestination = "http://www.typescriptlang.org/", Description = "Typescript is Microsoft's answer to enterprise level JavaScript development, and for a great reason.  Most of you working on MVC based apps will likley be using C#.  Making the jump from C# to JS code and back again multiple times in a projects creation destroys your focus, and takes time to adjust after every leap. Typescript removes that problem by giving you a language construct that is by it's very nature very simple to your C# code, but is actually just extended javascript, it doesn't remove the mind shift entirely, but it reduces the impact and gives you some new kickass features that JavaScript sadly lacks.", ThumbNail = "images/typescript.png" },
      new LinkObject { LinkId = 4, LinkText = "Shawty's Blog", LinkDestination = "http://shawtyds.wordpress.com", Description = "Your humble hosts tiny little corner of the web, where here chatters on about different technologies that he's played with and is doing interesting things with, do drop by and say hello. Oh and the blog post that goes with this app is also there too.", ThumbNail = "images/shawtyds.png" }
    };

    public static List<LinkObject> GetAll()
    {
      return _theData.OrderBy(x => x.LinkId).ToList();

    }

  }
}
