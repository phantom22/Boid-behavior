
/* 
 * https://closure-compiler.appspot.com/home
 * @compilation_level ADVANCED_OPTIMIZATIONS
 */
function g(a,c){this.x=a;this.y=c}var n=new g(0,0),p=new g(0,1),q=new g(0,-1),t=new g(1,0),u=new g(-1,0);Object.freeze(g);Object.freeze(n);Object.freeze(p);Object.freeze(q);Object.freeze(t);Object.freeze(u);function w(a){var c=x,k=y,m=document.querySelector(c.query);m.width=c.g.x;m.height=c.g.y;m.style.width=c.g.x;m.style.height=c.g.y;this.canvas=m;this.l=this.canvas.getContext("2d");this.v=a;this.g=c.g;this.i=[];for(a=0;a<k.count;a++)this.i.push(new z(k));this.s()}
w.prototype.clear=function(){this.l.fillStyle="black";this.l.fillRect(0,0,this.g.x,this.g.y)};w.prototype.s=function(){this.v(this);requestAnimationFrame(this.s.bind(this))};
function z(a){this.m=a.m;if(Array.isArray(a.h)){var c=a.h[0];var k=a.h[1];c=new g(Math.random()*(k.x-c.x)+c.x,Math.random()*(k.y-c.y)+c.y)}else c=a.h;this.h=c;this.angle=a.angle instanceof g?Math.random()*(a.angle.y-a.angle.x)+a.angle.x:a.angle;this.j=a.j;this.color="number"===typeof a.u?this.j[a.u]:this.j[Math.floor(Math.random()*a.j.length)];this.o=!1}
z.prototype.move=function(){var a=this.h;var c=new g(Math.cos(this.angle)*y.speed*.016,Math.sin(this.angle)*y.speed*.016);a=new g(a.x+c.x,a.y+c.y);!this.o&&(0>a.x||a.x>this.m.x||0>a.y||a.y>this.m.y)?(a=this.h,c=this.m,this.h=new g(Math.max(n.x,Math.min(a.x,c.x)),Math.max(n.y,Math.min(a.y,c.y))),this.angle=-this.angle+.4*Math.random()-.2,a=this.j.indexOf(this.color),a=a+1===this.j.length?0:a+1,this.color=this.j[a],this.o=!0):(this.h=a,this.o=!1)};
var A=[],x={query:"#canvas-output",g:new g(1800,900)},y={count:2E3,m:x.g,h:new g(x.g.x/2,x.g.y/2),angle:new g(0,2*Math.PI),speed:300,B:2,j:"#ffffff #ffffe6 #ffffcc #ffffb3 #ffff99 #ffff80 #ffff66 #ffff4d #ffff33 #ffff1a #ffff00 #e6e600 #cccc00 #b3b300 #999900 #808000 #666600 #4d4d00 #333300 #1a1a00 #000000".split(" "),u:0,A:0};
new w(function(a){a.C=[];var c=a.g.x/100,k=a.g.y/100;a.l.fillStyle="rgba(0, 0, 0, "+y.A+")";a.l.fillRect(0,0,a.g.x,a.g.y);var m=1/(a.g.x/c);k=1/(a.g.y/k);for(var l=0;l<a.i.length;l++){var r=a.i[l].h,b=Math.floor(Math.floor(r.y*k)*c+Math.floor(r.x*m));"undefined"==typeof A[b]&&(A[b]=0);A[b]+=1;var f=void 0,d=void 0,h=void 0,e=a.i[l].angle-Math.PI/2;b=[1+b+1*c+1,1+b+1*c,1+b+1*c-1,1+b-1,1+b-1*c-1,1+b-1*c,1+b-1*c+1,1+b+1];5.105<e&&5.89>=e?(h=0,d=[b[7],b[0],b[1]]):5.89<e||.392>=e?(h=1,d=[b[0],b[1],b[2]]):
.392<e&&1.178>=e?(h=2,d=[b[1],b[2],b[3]]):1.178<e&&1.963>=e?(h=3,d=[b[2],b[3],b[4]]):1.963<e&&2.748>=e?(h=4,d=[b[3],b[4],b[5]]):2.748<e&&3.534>=e?(h=5,d=[b[4],b[5],b[6]]):3.534<e&&4.319>=e?(h=6,d=[b[5],b[6],b[7]]):4.319<e&&5.105>=e&&(h=7,d=[b[6],b[7],b[0]]);for(b=e=0;3>b;b++){var v=A[d[b]];"number"==typeof v&&v>e&&(e=v,f=h+b-1)}f=-1===f?7:f;f=8===f?0:f;d=7===h+f?7===f?1:-1:f<h?1:-1;"number"==typeof f&&h!=f&&(a.i[l].angle+=y.B*d*.016*Math.random());a.i[l].move();f=a.i[l].h;h=a.i[l].color;d=a.l;d.lineCap=
"round";d.lineJoin="round";d.strokeStyle=h;d.beginPath();d.moveTo(r.x,r.y);d.lineTo(f.x,f.y);d.stroke()}});