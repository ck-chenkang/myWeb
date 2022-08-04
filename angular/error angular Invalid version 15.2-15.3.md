解決参考链接：

[参考链接](https://stackoverflow.com/questions/71322252/how-to-find-the-angular-invalid-version-15-2-15-3-error/72545783#72545783)

下面这个可以解决

```
# Update this library to the latests major version and it should fix this issue
yarn add @angular-devkit/build-angular -D
# if you are using angular 13 e.g. run this command

yarn add @angular-devkit/build-angular@13.3.7 -D
# or the same using npm
npm i --save-dev @angular-devkit/build-angular@13.3.7
```

