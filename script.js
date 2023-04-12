function drawArrayToCanvas(arr, Elem='logo') {
    const canvas = document.getElementById(Elem);
    const context = canvas.getContext('2d');

    // Loop through each element in the 2D array and map it to the canvas
    const cellSizeY = Math.floor(canvas.height / arr.length);
    for (let i = 0; i < arr.length; i++) {
        const cellSizeX = canvas.width / arr[i].length;
        for (let j = 0; j < arr[i].length; j++) {
            const color = arr[i][j] === "|" ? `#00${((Math.random()*127)|128).toString(16)}00` : '#000000'; // Set color based on 0 or 1
            const x = j * cellSizeX;
            const y = i * cellSizeY;

            // Set the fill color based on the array value
            context.fillStyle = color;

            // Draw a filled rectangle for each cell in the array
            context.fillRect(x, y, Math.ceil(cellSizeX)+1, Math.ceil(cellSizeY));
        }
    }
}
// Example 8x8 array of 0s and 1s
const logoArray = [
    "||| | | | | | |   ||| ||| ||| |   |||",
    "|   | | | | | |    |  | | | | |   |  ",
    "|   ||| |||  |     |  | | | | |   |||",
    "|   | |  |  | |    |  | | | | |     |",
    "||| | |  |  | |    |  ||| ||| ||| |||"
];

  drawArrayToCanvas(logoArray)

globalThis.decodeW = function (x) {
    try {
    x.value=x.value.trim()
    const step1 = decodeURIComponent(x.value.replace(/^.*?\?oneliner=/,'').replace(/&oneliner2=.+$/,'').replace(/&rate=\d+$/,''))
    const step2 = (/&oneliner2=.+&t/.test(x.value))?decodeURIComponent(x.value.replace(/^.*?&oneliner2=/,'').replace(/&t\d?=\d+.*$/,'')):''
    const step3 = x.value.match(/\d+$/)
    return step2/*/&oneliner2=.+&t/.test(x.value)*/?`[(${step1}),(${step2})]\n\n// Samplerate: ${step3[0]}`:`${step1}\n\n// Samplerate: ${step3[0]}`
    } catch (err) {
        if(/^Cannot read properties of null/i.test(err.message)) { 
            return "Put a wurstcaptures \/music\/ link in the white box to run it through decoding"
        } else {
            return err.message
        }
    }
}
globalThis.decodeE = function (x) {
    return decodeURIComponent(x.value.trim().replace(/^.*?music\/#/,''))
}
globalThis.script = function (ID){
    const input = document.getElementById(`in${ID}`)
    const output = document.getElementById(`out${ID}`)
        switch(ID){
            case 0: output.value = decodeW(input); break;
            case 1: output.value = decodeE(input); break;
            default: throw new Error(`Unknown ID (${ID})`)
        }
}
globalThis.copy = function (ID) {
    const toCopy = document.getElementById(`out${ID}`).value
    navigator.clipboard.writeText(toCopy)
}