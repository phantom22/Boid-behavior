var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};var Vector3=function(a,b,c){if("number"!=typeof a||"number"!=typeof b||"number"!=typeof c)throw Error("expected three arguments of type 'number', got '"+typeof a+", "+typeof b+", "+typeof c+"'");this.x=a;this.y=b;this.z=c};
Vector3.prototype={magnitude:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2))},normalize:function(){var a=this.magnitude;return 0!=a?Vector3.divide(this,Vector3.from_number(a)):Vector3.from_number(0)},floor:function(){return new Vector3(Math.floor(this.x),Math.floor(this.y),Math.floor(this.z))},ceil:function(){return new Vector3(Math.ceil(this.x),Math.floor(this.y),Math.floor(this.z))},round:function(){return new Vector3(Math.round(this.x),Math.round(this.y),Math.round(this.z))}};
Vector3.from_number=function(a){return new Vector3(a,a,a)};Vector3.add=function(a,b){return new Vector3(a.x+b.x,a.y+b.y,a.z+b.z)};Vector3.subtract=function(a,b){return new Vector3(a.x-b.x,a.y-b.y,a.z-b.z)};Vector3.multiply=function(a,b){return new Vector3(a.x*b.x,a.y*b.y,a.z*b.z)};Vector3.divide=function(a,b){return new Vector3(a.x/b.x,a.y/b.y,a.z/b.z)};Vector3.sum=function(a,b){return a.x+b.x+a.y+b.y+a.z+b.z};Vector3.diff=function(a,b){return a.x-b.x+a.y-b.y+a.z-b.z};
Vector3.dot=function(a,b){return a.x*b.x+a.y*b.y+a.z*b.z};Vector3.quot=function(a,b){return a.x/b.x+a.y/b.y+a.z/b.z};Vector3.clamp=function(a,b,c){return new Vector2(Math.max(b.x,Math.min(a.x,c.x)),Math.max(b.y,Math.min(a.y,c.y)),Math.max(b.z,Math.min(a.z,c.z)))};Vector3.random=function(a,b){return new Vector3(Math.random()*(b-a)+a,Math.random()*(b-a)+a,Math.random()*(b-a)+a)};
Vector3.range=function(a,b){return new Vector3(Math.random()*(b.x-a.x)+a.x,Math.random()*(b.y-a.y)+a.y,Math.random()*(b.z-a.z)+a.z)};Vector3.lerp=function(a,b,c){c=Math.max(0,Math.min(1,c));return new Vector3((1-c)*a.x+b.x*c,(1-c)*a.y+b.y*c,(1-c)*a.z+b.z*c)};Vector3.invLerp=function(a,b,c){return((c.x-a.x)/(b.x-a.x)+(c.y-a.y)/(b.y-a.y)+(c.z-a.z)/(b.z-a.z))/3};Vector3.remap=function(a,b,c,d,e){a=Vector3.invLerp(a,b,e);return Vector3.lerp(c,d,a)};
Vector3.angle=function(a,b){var c=Math.acos(Vector3.dot(a,b)/(a.magnitude()*b.magnitude()));return isNaN(c)?0:c};Vector3.zero=Vector3.from_number(0);Vector3.up=new Vector3(0,1,0);Vector3.down=new Vector3(0,-1,0);Vector3.right=new Vector3(1,0,0);Vector3.left=new Vector3(-1,0,0);Vector3.forward=new Vector3(0,0,1);Vector3.back=new Vector3(0,0,-1);Object.freeze(Vector3);Object.freeze(Vector3.zero);Object.freeze(Vector3.up);Object.freeze(Vector3.down);Object.freeze(Vector3.right);Object.freeze(Vector3.left);
Object.freeze(Vector3.forward);Object.freeze(Vector3.back);