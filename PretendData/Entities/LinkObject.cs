﻿using System;
using System.Linq;

namespace PretendData.Entities
{
  public class LinkObject
  {
    public int LinkId { get; set; }
    public string LinkText { get; set; }
    public string LinkDestination { get; set; }
    public string Description { get; set; }
    public string ThumbNail { get; set; }
  }
}
