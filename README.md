# TypeScript-Window-UserList

A TypeScript Project getting the Usernames from `net user` and then gets the full name and the global classes by `net user <username>`. You can also check my Inspiration from [WindowsUserList](https://github.com/filip326/WindowsUserList), which does nearly the same in C# (.Net).

## Use

Edit the files, if your Computer doesn't give German Outputs. (It was developed for German Systems)

```bash
ts-node .
# or
ts-node index.ts
# or
npm run start
```

Type *1*, if you'd like to have the `/domain` at the end of the `net user /domain`. Else type *2*.
You get a JSON-File (`./users.json`) as an output.
