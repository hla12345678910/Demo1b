/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.
 */
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
    this.obsticleSheetAnim;
    this.turning = "";
    this.forward = false;

	//Set background color
    this.backgroundColor = "#039AFF";

    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:24,
        x: 320,
        y: 240,
    });
    this.obsticleSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"obsticleSheetImg",
        columns:7.85,
        rows:1,
        totalFrames:9,
        fps:12,
        x: 320,
        y: 240,
    }),
    this.addChild(this.obsticleSheetAnim);
    this.addChild(this.spriteSheetAnim);
    this.spriteSheetAnim.addEventListener("keydown",this.SetStatusOfSpider.bind(this));
    this.spriteSheetAnim.addEventListener("keyup",this.ResetStatusOfSpider.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.UpdateSpider.bind(this));
    //Start the SpriteSheetAnimation Object playing
    this.obsticleSheetAnim.play();

}

GameScreen.prototype =
{
    //*************************************************
    //******     ANIMATION CONTROL FUNCTIONS     ******
    //*************************************************
    SetStatusOfSpider: function(event){
        if(event.keyCode == 37)
            this.turning = "left";
        if(event.keyCode == 39)
            this.turning = "right";
        if(event.keyCode == 38)
            this.forward = true;
    },

    ResetStatusOfSpider: function(event){
        if(event.keyCode == 37 || event.keyCode == 39)
            this.turning = "";
        if(event.keyCode == 38)
            this.forward = false;
    },

    UpdateSpider: function(event){
        var spider = event.currentTarget;
        if(this.turning == "left")
            spider.rotation -= 4;
        if(this.turning == "right")
            spider.rotation += 4;
        if(this.forward){
            var theta = 0;
            var distance = 10;
            theta = (spider.rotation - 90) * Math.PI / 180;
            spider.x += distance * Math.cos(theta);
            spider.y += distance * Math.sin(theta);
        }

        if(this.turning != "" || this.forward)
            spider.play();
        else
            spider.stop();
    },

}
extend(GameScreen,TGE.Window);