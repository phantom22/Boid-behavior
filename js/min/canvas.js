var deltaTime=.016,Canvas=function(b,f,d,c){b=document.querySelector(b);b.width=f;b.height=d;b.style.width=f;b.style.height=d;this.canvas=b;this.ctx=this.canvas.getContext("2d");this.callback=c;this.dimensions=new Vector2(f,d);this.drawLoop()};Canvas.prototype.draw=function(){this.callback(this)};Canvas.prototype.clear=function(){this.ctx.fillStyle="black";this.ctx.fillRect(0,0,this.dimensions.x,this.dimensions.y)};
Canvas.prototype.drawLine=function(b,f,d){var c=this.ctx;c.strokeStyle=d;c.beginPath();c.moveTo(b.x,b.y);c.lineTo(f.x,f.y);c.stroke()};Canvas.prototype.drawLoop=function(){this.draw();requestAnimationFrame(this.drawLoop.bind(this))};var Agent=function(b){this.limits=b;this.xy=Vector2.range(Vector2.zero,b);this.angle=Vector2.random(1,-1)};
Agent.prototype.move=function(){var b=Vector2.add(this.xy,new Vector2(this.angle.x*agentSpeed*deltaTime,this.angle.y*agentSpeed*deltaTime));0>b.x||b.x>this.limits.x||0>b.y||b.y>this.limits.y?(this.xy=Vector2.clamp(this.xy,Vector2.zero,this.limits),this.angle=Vector2.random(1,-1)):this.xy=b};
for(var agents=[],agentColor="white",agentSpeed=100,trailDim=.15,agentSteerStrength=1,quadrantsX=100,quadrantsY=80,quadrants=[],agentQuadrants=[],CANVAS=new Canvas("#canvas-output",1E3,800,function(b){b.ctx.fillStyle="rgba(0, 0, 0, "+trailDim+")";b.ctx.fillRect(0,0,b.dimensions.x,b.dimensions.y);quadrants=[];agentQuadrants=[];for(var f=1/quadrantsX,d=1/quadrantsY,c=0;c<agents.length;c++){var e=agents[c].xy;agents[c].move();var h=agents[c].xy,g=Math.floor(Math.floor(e.y*d)*quadrantsX+Math.floor(e.x*
f));"undefined"==typeof quadrants[g]&&(quadrants[g]=0);quadrants[g]+=1;agentQuadrants[c]=g;e.x==h.x&&e.y==h.y||b.drawLine(e,h,agentColor)}for(b=0;b<agents.length;b++){f=agents[b].angle;d=agentQuadrants[b];c=[d-1,d+1,d-quadrantsX,d+quadrantsX,d-quadrantsX-1,d-quadrantsX+1,d+quadrantsX+1,d+quadrantsX-1];d=e=0;h=[!1,-1];for(g=0;g<c.length;g++){var k=quadrants[c[g]];"number"==typeof k&&k>e?(e=k,d=g):k===e&&(h[0]=!0,h[1]=k)}if(0!=e&&(!h[0]||h[1]!=e)){c=void 0;switch(d){case 0:c=new Vector2(-agentSteerStrength,
0);break;case 1:c=new Vector2(agentSteerStrength,0);break;case 2:c=new Vector2(0,-agentSteerStrength);break;case 3:c=new Vector2(0,agentSteerStrength);break;case 4:c=new Vector2(agentSteerStrength,-agentSteerStrength);break;case 5:c=new Vector2(-agentSteerStrength,-agentSteerStrength);break;case 6:c=new Vector2(agentSteerStrength,agentSteerStrength);break;case 7:c=new Vector2(-agentSteerStrength,agentSteerStrength)}d=Vector2.multiply(Vector2.from_number(deltaTime),Vector2.random(0,1));agents[b].angle=
Vector2.add(f,Vector2.multiply(c,d))}}}),a=0;500>a;a++)agents.push(new Agent(CANVAS.dimensions));