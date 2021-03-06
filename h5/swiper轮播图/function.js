var sina = {
	$: function(a) {
		if (document.getElementById) {
			return eval('document.getElementById("' + a + '")')
		} else {
			return eval('document.all.' + a)
		}
	},
	isIE: navigator.appVersion.indexOf("MSIE") != -1 ? true: false,
	addEvent: function(a, b, c) {
		if (a.attachEvent) {
			a.attachEvent("on" + b, c)
		} else {
			a.addEventListener(b, c, false)
		}
	},
	delEvent: function(a, b, c) {
		if (a.detachEvent) {
			a.detachEvent("on" + b, c)
		} else {
			a.removeEventListener(b, c, false)
		}
	},
	readCookie: function(l) {
		var i = "",
		I = l + "=";
		if (document.cookie.length > 0) {
			var a = document.cookie.indexOf(I);
			if (a != -1) {
				a += I.length;
				var b = document.cookie.indexOf(";", a);
				if (b == -1) b = document.cookie.length;
				i = unescape(document.cookie.substring(a, b))
			}
		};
		return i
	},
	writeCookie: function(O, o, l, I) {
		var i = "",
		c = "";
		if (l != null) {
			i = new Date((new Date).getTime() + l * 3600000);
			i = "; expires=" + i.toGMTString()
		};
		if (I != null) {
			c = ";domain=" + I
		};
		document.cookie = O + "=" + escape(o) + i + c
	},
	readStyle: function(i, I) {
		if (i.style[I]) {
			return i.style[I]
		} else if (i.currentStyle) {
			return i.currentStyle[I]
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var l = document.defaultView.getComputedStyle(i, null);
			return l.getPropertyValue(I)
		} else {
			return null
		}
	}
};
function ScrollPic(a, b, c, d, e) {
	this.scrollContId = a;
	this.arrLeftId = b;
	this.arrRightId = c;
	this.dotListId = d;
	this.listType = e;
	this.dotClassName = "dotItem";
	this.dotOnClassName = "dotItemOn";
	this.dotObjArr = [];
	this.listEvent = "onclick";
	this.circularly = true;
	this.pageWidth = 0;
	this.frameWidth = 0;
	this.speed = 10;
	this.space = 10;
	this.upright = false;
	this.pageIndex = 0;
	this.autoPlay = true;
	this.autoPlayTime = 5;
	this._autoTimeObj;
	this._scrollTimeObj;
	this._state = "ready";
	this.stripDiv = document.createElement("DIV");
	this.listDiv01 = document.createElement("DIV");
	this.listDiv02 = document.createElement("DIV")
};
ScrollPic.prototype.version = "1.20";
ScrollPic.prototype.author = "mengjia";
ScrollPic.prototype.initialize = function() {
	var a = this;
	if (!this.scrollContId) {
		throw new Error("����ָ��scrollContId.");
		return
	};
	this.scrollContDiv = sina.$(this.scrollContId);
	
	this.scrollContDiv.style[this.upright ? 'height': 'width'] = this.frameWidth + "px";
	this.scrollContDiv.style.overflow = "hidden";
	this.listDiv01.innerHTML = this.scrollContDiv.innerHTML;
	this.scrollContDiv.innerHTML = "";
	this.scrollContDiv.appendChild(this.stripDiv);
	this.stripDiv.appendChild(this.listDiv01);
	if (this.circularly) {
		this.stripDiv.appendChild(this.listDiv02);
		this.listDiv02.innerHTML = this.listDiv01.innerHTML
	};
	this.stripDiv.style.overflow = "hidden";
	this.stripDiv.style.zoom = "1";
	this.stripDiv.style[this.upright ? 'height': 'width'] = "32766px";
	if (!this.upright) {
		this.listDiv01.style.cssFloat = "left";
		this.listDiv01.style.styleFloat = "left";
		this.listDiv01.style.overflow = "hidden"
	};
	this.listDiv01.style.zoom = "1";
	if (this.circularly && !this.upright) {
		this.listDiv02.style.cssFloat = "left";
		this.listDiv02.style.styleFloat = "left";
		this.listDiv02.style.overflow = "hidden"
	};
	this.listDiv02.style.zoom = "1";
	sina.addEvent(this.scrollContDiv, "mouseover",
	function() {
		a.stop()
	});
	sina.addEvent(this.scrollContDiv, "mouseout",
	function() {
		a.play()
	});
	if (this.arrLeftId) {
		this.arrLeftObj = sina.$(this.arrLeftId);
		if (this.arrLeftObj) {
			sina.addEvent(this.arrLeftObj, "mousedown",
			function() {
				a.rightMouseDown()
			});
			sina.addEvent(this.arrLeftObj, "mouseup",
			function() {
				a.rightEnd()
			});
			sina.addEvent(this.arrLeftObj, "mouseout",
			function() {
				a.rightEnd()
			})
		}
	};
	if (this.arrRightId) {
		this.arrRightObj = sina.$(this.arrRightId);
		if (this.arrRightObj) {
			sina.addEvent(this.arrRightObj, "mousedown",
			function() {
				a.leftMouseDown()
			});
			sina.addEvent(this.arrRightObj, "mouseup",
			function() {
				a.leftEnd()
			});
			sina.addEvent(this.arrRightObj, "mouseout",
			function() {
				a.leftEnd()
			})
		}
	};
	if (this.dotListId) {
		this.dotListObj = sina.$(this.dotListId);
		this.dotListObj.innerHTML = "";
		if (this.dotListObj) {
			var b = Math.round(this.listDiv01[this.upright ? 'offsetHeight': 'offsetWidth'] / this.frameWidth + 0.4),
			i,
			tempObj;
			for (i = 0; i < b; i++) {
				tempObj = document.createElement("span");
				this.dotListObj.appendChild(tempObj);
				this.dotObjArr.push(tempObj);
				if (i == this.pageIndex) {
					tempObj.className = this.dotOnClassName
				} else {
					tempObj.className = this.dotClassName
				};
				if (this.listType == 'number') {
					tempObj.innerHTML = i + 1
				};
				tempObj.title = "��" + (i + 1) + "ҳ";
				tempObj.num = i;
				tempObj[this.listEvent] = function() {
					a.pageTo(this.num)
				}
			}
		}
	};
	this.scrollContDiv[this.upright ? 'scrollTop': 'scrollLeft'] = 0;
	if (this.autoPlay) {
		this.play()
	}
};
ScrollPic.prototype.leftMouseDown = function() {
	if (this._state != "ready") {
		return
	};
	var a = this;
	this._state = "floating";
	this._scrollTimeObj = setInterval(function() {
		a.moveLeft()
	},
	this.speed)
};
ScrollPic.prototype.rightMouseDown = function() {
	if (this._state != "ready") {
		return
	};
	var a = this;
	this._state = "floating";
	this._scrollTimeObj = setInterval(function() {
		a.moveRight()
	},
	this.speed)
};
ScrollPic.prototype.moveLeft = function() {
	if (this.circularly) {
		if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + this.space >= this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')]) {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + this.space - this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')]
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += this.space
		}
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + this.space >= this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] - this.frameWidth) {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] - this.frameWidth;
			this.leftEnd()
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += this.space
		}
	};
	this.accountPageIndex()
};
ScrollPic.prototype.moveRight = function() {
	if (this.circularly) {
		if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] - this.space <= 0) {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] + this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] - this.space
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] -= this.space
		}
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] - this.space <= 0) {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = 0;
			this.rightEnd()
		} else {
			this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] -= this.space
		}
	};
	this.accountPageIndex()
};
ScrollPic.prototype.leftEnd = function() {
	if (this._state != "floating") {
		return
	};
	this._state = "stoping";
	clearInterval(this._scrollTimeObj);
	var a = this.pageWidth - this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] % this.pageWidth;
	this.move(a)
};
ScrollPic.prototype.rightEnd = function() {
	if (this._state != "floating") {
		return
	};
	this._state = "stoping";
	clearInterval(this._scrollTimeObj);
	var a = -this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] % this.pageWidth;
	this.move(a)
};
ScrollPic.prototype.move = function(a, b) {
	var c = this;
	var d = a / 5;
	if (!b) {
		if (d > this.space) {
			d = this.space
		};
		if (d < -this.space) {
			d = -this.space
		}
	};
	if (Math.abs(d) < 1 && d != 0) {
		d = d >= 0 ? 1 : -1
	} else {
		d = Math.round(d)
	};
	var e = this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d;
	if (d > 0) {
		if (this.circularly) {
			if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d >= this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')]) {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d - this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')]
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += d
			}
		} else {
			if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d >= this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] - this.frameWidth) {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] - this.frameWidth;
				this._state = "ready";
				return
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += d
			}
		}
	} else {
		if (this.circularly) {
			if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d < 0) {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] + this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] + d
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += d
			}
		} else {
			if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] - d < 0) {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] = 0;
				this._state = "ready";
				return
			} else {
				this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] += d
			}
		}
	};
	a -= d;
	if (Math.abs(a) == 0) {
		this._state = "ready";
		if (this.autoPlay) {
			this.play()
		};
		this.accountPageIndex();
		return
	} else {
		this.accountPageIndex();
		this._scrollTimeObj = setTimeout(function() {
			c.move(a, b)
		},
		this.speed)
	}
};
ScrollPic.prototype.pre = function() {
	if (this._state != "ready") {
		return
	};
	this._state = "stoping";
	this.move( - this.pageWidth, true)
};
ScrollPic.prototype.next = function(a) {
	if (this._state != "ready") {
		return
	};
	this._state = "stoping";
	if (this.circularly) {
		this.move(this.pageWidth, true)
	} else {
		if (this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] >= this.listDiv01[(this.upright ? 'scrollHeight': 'scrollWidth')] - this.frameWidth) {
			this._state = "ready";
			if (a) {
				this.pageTo(0)
			}
		} else {
			this.move(this.pageWidth, true)
		}
	}
};
ScrollPic.prototype.play = function() {
	var a = this;
	if (!this.autoPlay) {
		return
	};
	clearInterval(this._autoTimeObj);
	this._autoTimeObj = setInterval(function() {
		a.next(true)
	},
	this.autoPlayTime * 1000)
};
ScrollPic.prototype.stop = function() {
	clearInterval(this._autoTimeObj)
};
ScrollPic.prototype.pageTo = function(a) {
	if (this.pageIndex == a) {
		return
	};
	clearTimeout(this._scrollTimeObj);
	this._state = "stoping";
	var b = a * this.frameWidth - this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')];
	this.move(b, true)
};
ScrollPic.prototype.accountPageIndex = function() {
	var a = Math.round(this.scrollContDiv[(this.upright ? 'scrollTop': 'scrollLeft')] / this.frameWidth);
	if (a == this.pageIndex) {
		return
	};
	this.pageIndex = a;
	if (this.pageIndex > Math.round(this.listDiv01[this.upright ? 'offsetHeight': 'offsetWidth'] / this.frameWidth + 0.4) - 1) {
		this.pageIndex = 0
	};
	var i;
	for (i = 0; i < this.dotObjArr.length; i++) {
		if (i == this.pageIndex) {
			this.dotObjArr[i].className = this.dotOnClassName
		} else {
			this.dotObjArr[i].className = this.dotClassName
		}
	}
};