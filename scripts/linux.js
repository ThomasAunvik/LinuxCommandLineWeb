var startText = "root@thaun:~# ";

var consoleTextElement;
document.addEventListener('DOMContentLoaded', function() {
    consoleTextElement = document.getElementById("consoleText");
    consoleTextElement.textContent = startText;
    consoleTextElement.focus();
    
    document.addEventListener("keydown", function(e){
        e.stopPropagation();
        onKeyDown(e);
    });
    
 }, false);

var toggleUnderscore = true;
window.setInterval(function(){
    if(document.hasFocus()){
        if(toggleUnderscore){
            consoleTextElement.textContent += "_";
            toggleUnderscore = false;
        }else{
            var text = consoleTextElement.textContent;
            if(text[text.length - 1] == '_') text = text.slice(0,-1);
            consoleTextElement.textContent = text;
            toggleUnderscore = true;
        }
    }
}, 500);

var textWritten = "";
function onKeyDown(e){
    var key = e.key;
    if(isLetter(key)){
        write(key);
        textWritten += key;
    }else if(key == "Backspace"){
        var text = consoleTextElement.textContent;
        
        var removeLess = 0;
        if(text[text.length - 1] == '_') removeLess++;
        var shouldRemove = textWritten.length > 0 && text.length - textWritten.length - removeLess > 0;
        if(shouldRemove){

            text = text.splice(text.length - 1 - removeLess, 1, "");
            consoleTextElement.textContent = text;
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
        if(consoleTextElement.textContent == "" && echo){
            addText = startText;
        }
        write(addText);
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function RemoveTextWritten(){
    var text = consoleTextElement.textContent;

    var removeLess = 0;
    if(text[text.length - 1] == '_') removeLess++;

    text = text.splice(text.length - removeLess - textWritten.length, textWritten.length - removeLess, "");
    consoleTextElement.textContent = text;
    
    textWritten = 0;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function isLetter(str) {
    return str.length == 1;
}

function write(addText){
    var text = consoleTextElement.textContent;
    if(text[text.length - 1] == '_'){
        text = text.splice(text.length - 1, 0, addText); 
    }else {
        text += addText;
    }
    consoleTextElement.textContent = text;
}