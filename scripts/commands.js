var commands = ["help", "echo", "clear", "cls", "spongebob"];

function ValidateCommand(command){
    var newCommand = command.split(" ");
    for(var i = 0; i < commands.length; i++){
        console.log(newCommand[0].toLowerCase() + " " + commands[i]);
        if(newCommand[0].toLowerCase() == commands[i].toLowerCase()){
            return newCommand;
        }
    }
    return false;
}

function ExcecuteCommand(command){
    command[0] = command[0].toLowerCase();
    if(command[0] == "echo" || command[0] == "cls"){
        Echo(command);
    }else if(command[0] == "clear"){
        Clear();
    }else if(command[0] == "help"){
        Help();
    }else if(command[0] == "spongebob"){
        SpongeBob(command);
    }
}

function Help(){
    var text = "\nAll the commands!";
    for(var i = 0; i < commands.length; i++){
        text += "\n" + commands[i];
    }
    write(text);
}

function Clear(){
    consoleTextElement.textContent = "";
    textWritten = "";
}
var echo = true;
function Echo(text){
    if(text.length == 2 && (text[1] == "off" || text[1] == "on")){
        if(text[1] == "on") echo = true;
        else if(text[1] == "off") echo = false;
        return;
    }

    if(text.length > 1){
        var writeText = "";
        for(var i = 1; i < text.length; i++){
            writeText += text[i] + " ";
        }
        write("\n" + writeText);
    }else{
        write("\nECHO is " + (echo ? "on" : "off"));
    }
}

function SpongeBob(text){
    var writeText = "";
    for(var i = 1; i < text.length; i++){
        var partText = text[i];
        for(var j = 0; j < text[i].length; j++){
            if(j % 2 == 0){
                partText = partText.replaceAt(j, partText[j].toLowerCase());
            }else{
                partText = partText.replaceAt(j, partText[j].toUpperCase());
            }
        }
        text[i] = partText;
        writeText += text[i] + " ";
    }
    write("\n" + writeText);
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}