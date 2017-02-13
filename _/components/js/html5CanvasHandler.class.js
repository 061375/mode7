/**
 *
 *
 * */
function html5CanvasHandler(obj)
{
    this.__construct = function()
    {
        obj.error = new Object;
        obj.error.bool = false;
        obj.error.type = 0;
        if(undefined == obj.node) // html tag to append to
        {
            obj.node = $('body');
        }
        if(undefined == obj.width)
        {
            obj.width = 500;
        }
        if(undefined == obj.height)
        {
            obj.height = 500;
        }
        if(undefined != obj.image)
        {
            switch(typeof obj.image)
            {
                case "string":
                    obj.error.bool = true;
                    obj.error.type = 2;
                break;
                case "number":
                    obj.error.bool = true;
                    obj.error.type = 3;
                break;
            }
            if(false == obj.error.bool)
            {
                if(undefined == obj.frameWidth)
                {
                    obj.frameWidth = obj.image.width;
                }
                if(undefined == obj.frameHeight)
                {
                    obj.frameHeight = obj.image.height;
                }
                if(undefined == obj.frameWidthScale)
                {
                    obj.frameWidthScale = obj.image.width;
                }
                if(undefined == obj.frameHeightScale)
                {
                    obj.frameHeightScale = obj.image.height;
                }
                if(undefined == obj.frame)
                {
                    obj.frame = 0;
                }
            }
            else
            {
                this.errorHandler();
            }
        }
    }
    this.__construct();
    this.makeCanvasGetContext =  function()
    {
        // Create html syntax for canvas element.
        canvasElement = $('<canvas width="' + obj.width + 
          '" height="' + obj.height + '" ></canvas>');
        // Reference to the canvas 2d context.
        canvas = canvasElement.get(0).getContext("2d");
        // Dynamically append a canvas element to the body tag.
        canvasElement.appendTo(obj.node);
            
        this.canvasElement = canvasElement;
        this.canvas = canvas;
        this.width = obj.width;
        this.height = obj.height;
    }
    this.drawImageToCanvas = function()
    {
        
        if(undefined == obj.image)
        {
            obj.error.bool = true;
            obj.error.type = 1;
        }
        if(undefined == this.frame_x)
        {
            var frame_x = 0;
        }
        else
        {
            var frame_x = this.frame_x * this.frameWidth;
        }
        if(undefined == this.frame_y)
        {
            var frame_y = 0;
        }
        else
        {
            var frame_y = this.frame_y;
        }
        // frame x , y 2
        if(undefined == this.x_pos)
        {
            var x_pos = 0;
        }
        else
        {
            var x_pos = this.x_pos;
        }
        if(undefined == this.y_pos)
        {
            var y_pos = 0;
        }
        else
        {
            var y_pos = this.y_pos;
        }
        if(true != obj.error.bool)
        {
            this.canvas.clearRect(0, 0, this.width, this.height);
            this.canvas.save();
            this.canvas.drawImage(obj.image,frame_x,frame_y,32,32,x_pos,y_pos,this.frameWidthScale,this.frameHeightScale);
            // Put it on the canvas
            this.canvas.restore();
        }
        else
        {
            this.errorHandler();
        }
    }
    this.makeLine = function(x1,y1,x2,y2,color)
    {
        this.canvas.beginPath();
        this.canvas.moveTo(x1,y1);
        this.canvas.lineTo(x2,y2);
        this.canvas.lineWidth = 1;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
        this.canvas.closePath();
    }
    this.makeCircles = function(x,y)
    {
        this.canvas.fillStyle="#FF0000";       
        this.canvas.beginPath();
        this.canvas.arc(x,y,5,0,Math.PI*2,true);
        this.canvas.closePath();
	this.canvas.fill();
    }
    this.makeRectangle = function(x1,y1,x2,y2,color)
    {
	this.canvas.fillStyle=color;
	this.canvas.fillRect(x1,y1,x2,y2);
    }
    this.clearCanvas = function()
    {
        this.canvas.clearRect(0, 0, this.width, this.height);
    }
    this.errorHandler = function()
    {
        switch(obj.error.type)
        {
            case 1:
                obj.image = new Image();
                obj.image.src = "/resources/images/image_missing.jpg";
                this.canvas.clearRect(0, 0, this.width, this.height);
                this.canvas.save();
                this.canvas.drawImage(obj.image,0,0,200,200,0,0,200,200);
                this.canvas.restore();
                //$.logThis("Error 1 :: Image not defined or not found");
            break;
            case 2:
                //$.logThis("Error 2 :: Type must be an Image - Found a string");
            break;
            case 3:
                //$.logThis("Error 3 :: Type must be an Image - Found a number");
            break;
        default:
            //$.logThis("Error 0 :: Unknown Error");
        }
        clearInterval(intID);
        //$.logThis("Program Exitting");
    }
}
    