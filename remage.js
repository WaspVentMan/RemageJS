const fs = require("fs")

let fileData = fs.readFileSync("peter_die.remage").toString()

let data = fileData.substring(5)

function image_colour(data){
    let colour_dict = {
        "0": "\033[30;", "1": "\033[90;", "2": "\033[37;", "3": "\033[97;", "4": "\033[33;", "5": "\033[93;",
        "6": "\033[31;", "7": "\033[91;", "8": "\033[35;", "9": "\033[95;", "a": "\033[34;", "b": "\033[94;",
        "c": "\033[36;", "d": "\033[96;", "e": "\033[32;", "f": "\033[92;", "\\": "\n"}
    let colour = colour_dict[data]
    if(!colour) {
        console.log("FUCK FG: " + data)
    }
    return colour_dict[data]
}

function bg_colour(data){
    colour_dict = {
        "0": "40", "1": "100", "2": "47", "3": "107", 
        "4": "43", "5": "103", "6": "41", "7": "101",
        "8": "45", "9": "105", "a": "44", "b": "104",
        "c": "46", "d": "106", "e": "42", "f": "102"}
    let colour = colour_dict[data]
    if(!colour) {
        console.log("FUCK BG: " + data)
    }
    return colour_dict[data]
}

function remage(data){
    let image = ""
    let dict = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

    for (let i = 0; i < data.length; i++) {
        if(data[i] == "\\"){
            image += image_colour(data[i])
        }
        else if(dict.includes(data[i])){
            image += image_colour(data[i]) + "m██\033[0m"
        }
    }

    return image
}

function remage2x(data){
    let image = ""
    let key = "+,-./;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`ghijklmnopqrstuvwxyz|~"
    let hexy = "0123456789abcdef"
    
    for (let i = 0; i < data.length; i++) {
        if(data[i] == "\\"){
            image += "\\"
        }
        else if(key.includes(data[i+1])){
            let sav = data[i+1]
            for(let t = -3; t < key.length; t++){
                if(sav == key[t]){
                    break
                }
                image += data[i]
            }
        }
        else if(hexy.includes(data[i])){{
            image += data[i]
            }
        }
    }

    data = image; image = ""

    for (let i = 0; i < data.length; i++) {
        if(data[i] == "\\"){
            image += "\n"
        }
        else if(hexy.includes(data[i])){
            image += image_colour(data[i]) + bg_colour(data[i+1]) + "m▀\033[0m"
            i++
        }
    }

    return image
}

console.log(remage2x(data))