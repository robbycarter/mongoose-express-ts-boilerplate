import shell from "shelljs";

shell.cp("-R", "src/app/views", "dist/app/views/");
shell.rm("-rf", "dist/tests");
