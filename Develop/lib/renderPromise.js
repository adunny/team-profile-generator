const render = require("./htmlRenderer");
const fs = require('fs');


const writeHtml = employees => {
    return new Promise((resolve, reject) => {
        resolve(render(employees));
    })
        .then(html => {
            fs.writeFile("./dist/team.html", html, err => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`
                =================================
                Team created! Check /dist folder.
                =================================
                `)
                }
            })

        })
}






module.exports = writeHtml;