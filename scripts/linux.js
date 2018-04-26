var startText = "root@thaun:~# ";

var consoleTextElement;
document.addEventListener('DOMContentLoaded', function() {
    consoleTextElement = document.getElementById("consoleText");
    consoleTextElement.innerHTML = startText;
    
    /*document.addEventListener("keydown", function(e){
        e.stopPropagation();
        onKeyDown(e);
    });*/

    var element = document.createElement("input");
    element.id = "inputField";
    
    element.style.position = "absolute";
    element.style.top = "-50px";

    element.style.backgroundColor = "black";
    element.style.border = "";
    element.style.borderColor = "black";
    element.style.fill = "black";
    element.style.outlineColor = "black";

    document.body.appendChild(element);

    element.focus();

    element.addEventListener("keydown", function(e){
        e.stopPropagation();
        onKeyDown(e);
    });

 }, false);

var toggleUnderscore = true;
window.setInterval(function(){
    consoleTextElement.focus();
    document.getElementById("inputField").focus();
    if(document.hasFocus()){
        if(toggleUnderscore){
            consoleTextElement.innerHTML += "_";
            toggleUnderscore = false;
        }else{
            var text = consoleTextElement.innerHTML;
            if(text[text.length - 1] == '_') text = text.slice(0,-1);
            consoleTextElement.innerHTML = text;
            toggleUnderscore = true;
        }
    }
}, 500);

/*
var previousText = "";
window.setInterval(function(){
    console.log(document.getElementById("inputField").value);
    document.getElementById("inputField").focus();

    var newText = document.getElementById("inputField").value;
    if(newText.length > 0){
        if(previousText != newText){

        }
    }
}, 20);*/


var textWritten = "";
function onKeyDown(e){
    var key = e.key;

    if(isLetter(key)){
        write(key);
        textWritten += key;
    }else if(key == "Backspace"){
        var text = consoleTextElement.innerHTML;
        
        var removeLess = 0;
        if(text[text.length - 1] == '_') removeLess++;
        var shouldRemove = textWritten.length > 0 && text.length - textWritten.length - removeLess > 0;
        if(shouldRemove){

            text = text.splice(text.length - 1 - removeLess, 1, "");
            consoleTextElement.innerHTML = text;
            textWritten = textWritten.slice(0, -1);
        }
    }else if(key == "Escape"){
        RemoveTextWritten();
    }

    console.log("Button Pressed: " + key);
    
    if(key == "Enter"){
        var addText = "";
        if(textWritten != ""){
            var valid = ValidateCommand(textWritten);
            if(valid){
                ExcecuteCommand(valid);
            }else write("\n" + textWritten.split(" ")[0] + ": command not found");
            textWritten = "";
            addText += "\n";
        }
        if(echo){ 
            addText += "\n" + startText;
        }
        if(consoleTextElement.innerHTML == "" && echo){
            addText = startText;
        }
        write(addText);
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function RemoveTextWritten(){
    var text = consoleTextElement.innerHTML;

    var removeLess = 0;
    if(text[text.length - 1] == '_') removeLess++;

    text = text.splice(text.length - removeLess - textWritten.length, textWritten.length - removeLess, "");
    consoleTextElement.innerHTML = text;
    
    textWritten = 0;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function isLetter(str) {
    return str.length == 1;
}

function write(addText){
    var text = consoleTextElement.innerHTML;
    if(text[text.length - 1] == '_'){
        text = text.splice(text.length - 1, 0, addText); 
    }else {
        text += addText;
    }
    consoleTextElement.innerHTML = text;
}
