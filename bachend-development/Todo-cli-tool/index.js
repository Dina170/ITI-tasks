const fs = require("fs");
const { program, Option } = require("commander");

program
  .command("add")
  .requiredOption("-t, --title <title>", "title to use before name")
  .option("-i, --id <id of todo>", "display some debugging")
  .action((options) => {
    const dataString = fs.readFileSync("./db.json", "utf-8");
    const data = JSON.parse(dataString);
    const lastId = data[data.length - 1]?.id || 0;
    const newtodo = {
      title: options.title,
      id: Number(lastId) + 1,
      status: "to-do",
    };
    data.push(newtodo);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
  });

program
  .command("list")
  .addOption(
    new Option("-s, --status <status>", "status of todo").choices([
      "to-do",
      "in progress",
      "done",
    ])
  )
  .action((options) => {
    const dataString = fs.readFileSync("./db.json", "utf-8");
    const data = JSON.parse(dataString);
    if (options.status)
      console.log(data.filter((item) => item.status === options.status));
    else console.log(data);
  });

program
  .command("edit")
  .option("-t, --title <title>", "title to use before name")
  .addOption(
    new Option("-s, --status <status>", "status of todo").choices([
      "to-do",
      "in progress",
      "done",
    ])
  )
  .requiredOption("-i, --id <id of todo>", "display some debugging")
  .action((options, cmd) => {
    if (!options.title && !options.status) {
      cmd.error(
        "required option '-t, --title <title>' or '-s, --status <status>' not specified"
      );
    }
    const dataString = fs.readFileSync("./db.json", "utf-8");
    const data = JSON.parse(dataString);

    const todo = data.find((item) => item.id === Number(options.id));

    if (options.status) todo.status = options.status;
    if (options.title) todo.title = options.title;
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
  });

program
  .command("delete")
  .argument("<id>")
  .action((id) => {
    const dataString = fs.readFileSync("./db.json", "utf-8");
    const data = JSON.parse(dataString);

    const idx = data.findIndex((item) => item.id === Number(id));
    data.splice(idx, 1);
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
  });

program.parse(process.argv);
