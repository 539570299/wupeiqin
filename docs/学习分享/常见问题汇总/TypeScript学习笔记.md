---
outline: deep
---

# TypeScript学习笔记
## 1. TypeScript优势
- Javascript的超集，完美兼容js
  - JavaScript所拥有的特性，TypeScript全部都是支持的，在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展。
  - TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或更高版本）的JavaScript引擎中。
- 强类型语言（最重要特性之一），易于重构与理解。
  - 类型系统。
  - 编译时的静态类型检查。
- 大前端的发展趋势，强大IDE支持，VSCode前端必备
  - Angular源码、Vue源码都是用TypeScript来写的，开发Angular、Vue3和React也需要掌握TypeScript。
  - 目前大部分公司非常流行Vue3+TypeScript、React+TypeScript 的开发模式。
  - 从开发者长远的角度来看，学习TypeScript有助于我们培养类型思维，这种思维方式对于完成大型项目尤为重要。
## 2. TypeScript数据类型
### 原始类型: string number 和 boolean
string 类型是字符串类型
```ts
// 开发中为了方便并不会在每次声明的时候写上对应的类型，ts会通过本身的特性推导出对应的类型 
// let message:string = 'Hello World'
let message = 'Hello World' 
message = '123'
// message = 123 报错
```
number 类型是数字类型，所有数字都是 number 类型，没有 int、double 之分
```ts
let num = 100  // or let num:number = 100
num = 6.66
```
boolean 表示布尔值，boolean类型只有两个值：true和false
```ts
let flag = false // or let flag:boolean = false
flag = true
flag = 2 > 1
```
类型名 String，Number 和 Boolean（首字母大写）也是合法的，但它们是一些非常少见的特殊内置类型。所以类型总是使用 string，number 和 boolean。

### array类型
数组类型有两种方式
```ts
const arr1: Array<string> = [] 
const arr2: string[] = [] // 推荐写法
arr1.push('123')
arr2.push(123) //报错
```
### object类型
```ts
function printCoord(info: { name: string; age: number }) {
    console.log(info.name)
    console.log(info.age)
}
printCoord({ name: 'wupq', age: 32 })
```
### null 和 undefined类型
```ts
let u: undefined = undefined
let n: null = null
// undefined 和 null 是所有类型的子类型，可以赋值给其他类型
let str:srting = undefined
let num:number = unll
```
### Symbol类型
使用symbol类型的好处是可以避免当不同库向对象添加属性存在命名冲突的问题
```ts
const s1 = Symbol('name')
const s2 = Symbol('name')
const info = {
    [s1]: 'wupq',
    [s2]: 'wucj2'
}
```
### any 类型
当一个值是 type any 时，可以访问它的任何属性。
```ts
let obj: any = { x: 0 }
obj.foo()
obj()
obj.bar = 100
obj = 'hello'
const n: number = obj
```
使用场景：当进行一些类型断言 as any 或是在不想给某些JavaScript添加具体的数据类型时。
### unknown 和 never 类型
unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。和any有点类似，不过它和any类型不同的是，unknown类型只能赋值给any和unknown类型。any类型可以赋值给任意类型。
```ts
let result: unknown 
let message: string = result // 报错
let num: number = result // 报错
```
never 表示永远不会发生值的类型，如果一个函数中是一个死循环或者抛出一个异常，可以使用nerve类型。
```ts
function foo(): never {
    // 死循环
    while(true) {
    // ...
    }
}
function bar(): never {
    throw new Error()
}
```
### void 类型
void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型。
```ts
function sum(num1: number, num2: number) {
    console.log(num1 + num2)
}
```
### tuple类型
tuple是元组类型，数组合并了相同类型的对象，而元组合并了不同类型的对象。也就是说数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中，而元组中每个元素都有自己特性的类型，可以根据索引值获取到的值可以确定对应的类型。
```ts
let tuple: [number, string, boolean] = [7, 'hello', true]
let [a, b, c] = tuple // a: number, b: string, c: boolean
let [a, b, c, d] = tuple // 报错
```
当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
```ts
let tuple: [string, number]
tuple= ['wupq', 32]
tuple.push('male')
tuple.push(true) // 报错 tuple的联合类型是string和number，没有boolean
```

## 3. TypeScript其他类型
### 参数类型
声明函数时，可以在每个参数后面加上类型注解，声明函数接受哪些类型的参数。
```ts
function greet(name: string) {
    console.log('Hello, ' + name.toUpperCase() + '!!')
}
greet('World')
greet(42) // 报错
```
### 返回值类型
我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面。
```ts
function getFavoriteNumber(): number {
    return 26
}
```
和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的返回类型，某些第三方库处于方便理解，会明确指定返回类型，但是这个看个人喜好。
### 匿名函数
匿名函数与函数声明会有一些不同，当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时，该函数的参数会自动指定类型。
```ts
const names = ['abc', 'cba', 'nba']
// item根据上下文的环境推导出来的, 这个时候可以不添加的类型注解
// 上下文中的函数: 可以不添加类型注解
names.forEach(function(item) {
    console.log(item.split(''))
})
```
我们并没有指定item的类型，但是item是一个string类型：这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型，这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型。
### 对象类型
要定义对象类型，我们只需列出其属性及其类型。
```ts
function printCoord(pt: { x: number; y: number }) {
    console.log(pt.x)
    console.log(pt.y)
}
printCoord({ x: 3, y: 7 })
```
在这里我们使用了一个对象来作为类型：
  - 在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型
  - 属性之间可以使用 , 或者 ; 来分割，最后一个分隔符是可选的
  - 每个属性的类型部分也是可选的，如果不指定，那么就是any类型
### 可选类型
对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个?:
```ts
function printName(obj: { first: string; last?: string }) {
    // ...
}
printName({ first: 'wupq' })
printName({ first: 'wucj', last: 'wucj2' })
```
### 联合类型
定义联合类型
  - 联合类型是由两个或者多个其他类型组成的类型；
  - 表示可以是这些类型中的任何一个值；
  - 联合类型中的每一个类型被称之为联合成员（union's members）
```ts
function printId(id: number | string) {
    console.log('Your ID is: ' + id)
}
printId(101)
printId('202')

printId({ myID: 22342 }) // 报错
```
使用联合类型

只有在对联合体的每个成员都有效的情况下才允许操作。我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法，
解决方案是使用缩小（narrow）联合：
```ts
function printId(id: number | string) {
    if (typeof id === 'string') {
        // 确定id是 string类型
        console.log(id.toUpperCase())
    } else {
        // 这里是 number 类型
        console.log(id)
    }
}
```
### 类型别名
在前面，我们通过在类型注解中编写 对象类型 和 联合类型，但是当我们想要多次在其他地方使用时，就要编写多次。我们可以给对象类型起一个别名，然后多次使用。
```ts
type Point = {
    x: number
    y: number
}
 
// 和上面对象类型的例子一致
function printCoord(pt: Point) {
    console.log(pt.x)
    console.log(pt.y)
}
 
printCoord({ x: 100, y: 100 })
```
### 类型断言
有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言。

比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它具体的类型：
```ts
const myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement
```
### 字面量类型
就其本身而言，文字类型并不是很有价值：
```ts
let x: 'hello' = 'hello'
x = 'hello' 
x = 'hi' // 报错，hello只能是hello
```
变量只能有一个值并没有多大用处，但是我们可以将多个类型联合在一起
```ts
function printText(s: string, alignment: 'left' | 'right' | 'center') {
    // ...
}
printText('Hello, world', 'left')
printText("G'day, mate", 'top') // 报错，并没有分配 top 类型
```
### 字面量推理
当您使用对象初始化变量时，TypeScript 假定该对象的属性可能会在以后被更改
```ts
type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}

type Request = {
    url: string
    method: Method
}

const options = {
    url: 'https://www.coderwhy.org/abc',
    method: 'POST'
}

request(options.url, options.method) //  options.method报错
```
在上面的例子 options.method 中被推断为是 string 不是 'POST'，所以我们没办法将一个 string 赋值给一个 字面量 类型。

解决方法：
1. 添加类型断言来更改推理
```ts
type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}

type Request = {
    url: string
    method: Method
}

const options = {
    url: 'https://www.coderwhy.org/abc',
    method: 'POST'
}

request(options.url, options.method) as 'POST'
```
2. 使用 as const 将整个对象转换为类型文字：
```ts
type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}

type Request = {
    url: string
    method: Method
}

const options = {
    url: 'https://www.coderwhy.org/abc',
    method: 'POST'
} as const

request(options.url, options.method)
```
## 4. TypeScript类型缩小
例子：
```ts
function printID(id: string | number) {
    console.log(id.toUpperCase())
    // Property 'toUpperCase' does not exist on type 'number'
}
```
这个时候TypeScript会警告我们类型number上不存在toUpperCase属性，这是因为toUpperCase是类型string上的属性，必须对传入的参数的类型进行一个判断，通过类似于 typeof id=== 'string' 的判断语句，来改变TypeScript的执行路径，这个判断语句可以称之为类型保护。
### typeof 类型保护
在 TypeScript 中，检查返回的值 typeof 是一种类型保护。因为 TypeScript 编码了 typeof 对不同值的操作方式。
```ts
function printID(id: string | number) {
    if(typeof id === 'string') {
        console.log(id.toUpperCase())
    } else {
        console.log(id)
    }
}
```
### 平等缩小
TypeScript 还使用 switch 语句和相等性检查，如 === 、!==、== 和 != 来缩小类型。例如：
```ts
function printDirection(direction: 'top' | 'roght' | 'bottom' | 'left') {
    // 1.if判断
    // if (direction === 'left') {
    //   console.log(direction)
    // } else if ()

    // 2.switch判断
    // switch (direction) {
    //   case 'left':
    //     console.log(direction)
    //     break;
    //   case ...
    // }
}
```
### instanceof
JavaScript 有一个运算符来检查一个值是否是另一个值的“实例”：
```ts
function logValue(x: Date | string) {
    if(x instanceof Date) {
        console.log(x.toUTCString()) // (parameter) x: Date
    } else {
        console.log(x.toUpperCase()) // (parameter) x: string
    }
}
```
### in
Javascript 有一个运算符，用于确定对象是否具有带名称的属性：in运算符。例如：
```ts
type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
    if('swim' in animal) {
        return animal.swim()
    }
    return animal.fly()
}
```

## 5. TypeScript的函数类型
函数是JavaScript的一等公民
### 函数类型表达式
```ts
function greeter(fn: (a: string) => void) {
    fn('Hello, World')
}
function printToConsole(s: string) {
    console.log(s)
}
greeter(printToConsole)

// 另一种推荐写法：类型别名来命名函数
type GreetFunction = (a: string) => void
function greeter(fn: GreetFunction) {
    // ...
}
```
(a: string) => void 意思是“一个参数类型为字符串并且没有返回值的函数a”。就像函数声明一样，如果未指定参数类型，则它是隐式的any。
### 可选参数
TypeScript 中函数的可选参数用 ?: 标记
```ts
function f(x: number, y?: number) {
    // ...
}
f(10) // OK
f(10, 20) // OK
```
这个时候这个参数x依然是有类型的，它实际上是 number | undefine。

另外可选类型需要在必传参数的后面。
### 默认参数
从ES6开始，JavaScript是支持默认参数的，TypeScript也是支持默认参数的：
```ts
function f(x: number, y: number = 11) {
    console.log(x, y)
}
f(10) // 10, 11
// 这个时候y的类型其实是 undefined 和 number 类型的联合
```
### 剩余参数
从ES6开始，JavaScript也支持剩余参数，剩余参数语法允许我们将一个不定数量的参数放到一个数组中。
```ts
function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x)
}

const a = multiply(10, 1, 2, 3, 4) // [10, 20, 30, 40]
```
### 在函数中声明this
TypeScript 将通过代码流分析推断this函数中应该是什么，例如：
```ts
const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true
    }
}
```
TypeScript认为函数 becomeAdmin 有一个对应的this的外部对象 user ，所以在使用时，就会把this当做该对象。

但是对于某些情况来说，我们并不知道this到底是什么，例如：
```ts
function becomeAdmin() {
    this.admin = true  
    // 'this' implicitly has type 'any' because it does not have a type annotation.
}

const user = {
    id: 123,
    admin: false,
    becomeAdmin
}

user.becomeAdmin()
```
这个时候 this 会报错，因为对于Typescript 来说，这个代码是不安全的，becomeAdmin 我们可以直接调用，也可以通过别的对象来调用。

这个时候，通常TypeScript会要求我们明确的指定this的类型：
```ts
type adminType = {
    admin: boolean
}
function becomeAdmin(this: adminType) {
    console.log(this.admin)
}

const user = {
    id: 123,
    admin: false,
    becomeAdmin
}

user.becomeAdmin()
```
### 函数的重载
在TypeScript中，如果我们编写了一个add函数，希望可以对字符串和数字类型进行相加，应该如何编写呢？
```ts
function sum(x: number | string, y: number | string): number | string {
    return x + y
    // Operator '+' cannot be applied to types 'string | number' and 'string | number'
}
// 如果这样来写，将会报错
```
在 TypeScript 中，可以通过编写重载签名来表示函数可以以不同方式进行调用，一般是编写两个或者以上的重载签名，再去编写一个通用的函数以及实现。

以上面的例子，可以这样写：
```ts
function sum(x: number, y: number): number
function sum(x: string, y: string): string
function sum(x: any, y: any): any {
    return x + y
}
console.log(sum(20, 22)) // 42
console.log(sum('20', '22')) // 2022
```
## 6. TypeScript类的使用
从ES6开始，JavaScript引入了class关键字，更加方便的的类的使用，TypeScript作为JavaScript的超集，也是支持使用class关键字。
### 类的属性和方法
使用 class 定义类，使用 constructor 定义构造函数。

通过 new 生成新实例的时候，会自动调用构造函数。
```ts
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    sayHi() {
        console.log(`My name is ${this.name}`)
    }
}

const p = new Person('wupq', 32)
console.log(p.name) // wupq
console.log(p.age) // 32
p.sayHi() // My name is wupq
```
### 类的继承
使用 extend 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。
```ts
class Boyfriend extends Person {
    height: number

    constructor(name: string, age: number, height: number) {
        // super调用父类的构造器
        super(name, age)
        this.height = height
    }

    sayHi() {
        console.log('hhhhhh')
        super.sayHi()
    }
}

const boyfriend = new Boyfriend('wupq', 32, 175)
console.log(boyfriend.name) // wupq
console.log(boyfriend.age) // 32
console.log(boyfriend.height) // 175
boyfriend.sayHi() // hhhhhh My name is wupq
```
### 类的修饰符
TypeScript 可以使用三种访问修饰符，分别是 public、private、protected
  - public 修饰的是在任何地方可见、公有的属性或方法，默认所有的属性和方法都是public的；
  - private 修饰的是仅在同一类中可见、私有的属性或方法；
  - protected 修饰的是仅在类自身及子类中可见、受保护的属性或方法；
```ts
// private 
class Person {
    private name: string

    constructor(name: string) {
        this.name = name
    }
}
const p = new Person('wupq')
console.log(p.name)
// Property 'name' is private and only accessible within class 'Person'
```
```ts
// protected 
class Person {
    protected name: string

    constructor(name: string) {
        this.name = name
    }
}
class Boyfriend extends Person {
    constructor(name: string) {
        super(name)
    }

    sayHi() {
        console.log(`My name is ${this.name}`)
    }
}
const boyfriend = new Boyfriend('wupq')
boyfriend.sayHi() // My name is wupq
```
### 只读属性 readonly
只读属性关键字，只允许出现在属性声明或索引签名或构造函数中，不会被外界任意的修改。
```ts
class Person {
    readonly name: string

    constructor(name: string) {
        this.name = name
    }
}

const p = new Person('wupq')
p.name = 'wucj2'
// Cannot assign to 'name' because it is a read-only property.
```
### 存取器 getters/setters
使用 getter 和 setter 可以改变属性的赋值和读取行为，使用场景是在前面一些私有属性我们是不能直接访问的，这个时候可以使用存取器。
```ts
class Person {
    private name: string

    set namefn(newName) {
        this.name = newName
    }

    get namefn() {
        return this.name
    }

    constructor(name: string) {
        this.name = name
    }
}

const p = new Person('wupq')
p.namefn = 'wucj2'
console.log(p.namefn) // wucj2
```
### 静态方法 static 
使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用。
```ts
class Person {
    static lastName:string = 'wu'
    static sayHi() {
        console.log('hello')
    }
}

const p = new Person('wupq') // 报错
console.log(p.name) // 报错
p.sayHi() // 报错

console.log(Person.lastName) // wu
Person.sayHi() // hello
```
### 抽象类 abstract
abstract 用于定义抽象类和其中的抽象方法，在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法，抽象类是不允许被实例化的。
```ts
abstract class Animal {
    name:string
    constructor(name:string) {
        this.name = name
    }
    abstract sayHi():string
}

class Cat extends Animal {
    sayHi() {
        console.log(`Meow, My name is ${this.name}`)
        return this.name
    }
}

let cat = new Cat('Tom') // My name is Tom
```
### 类的类型
类本身也是可以作为一种数据类型的：
```ts
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    sayHi() {
        console.log(`My name is ${this.name}`)
    }
}

const p1: Person = new Person('wupq', 32)
const p2: Person = {
    name: 'wucj2',
    age: 27,
    sayHi() {
        console.log(`My name is ${this.name}`)
    }
}
console.log(p2.name) // wucj2
```
## 7. TypeScript接口的使用
在前面我们通过type可以用来声明一个对象类型，除此之外，在 TypeScript 中，我们可以使用接口（Interfaces）来定义对象的类型。
```ts
type Person = {
    name: string
    age: number
}
```
### 接口的声明
接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
```ts
interface Person {
    name: string
    age: number
}
function greet(person: Person ) {
    return 'Hello ' + person.name
}
```
### 可选属性
有时我们希望不要完全匹配一个形状，那么可以用可选属性：
```ts
interface Person {
    name: string
    age?: number
}

let person: Person = {
    name: 'wupq',
    age: 32 // age 可以不存在
}
```
### 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 readonly 来指定只读属性:
```ts
interface Person {
    readonly name: string
    age?: number,
    readonly children: {
        name: string
    }
}

let person: Person = {
    name: 'wupq',
    age: 32,
    children: {
        name: 'peipei'
    }
}

person.name = 'wucj2' // 报错，不可再修改

person.children.name = 'daughter'
console.log(person.children.name) // daughter
```
### 索引类型
前面我们使用 interface 来定义对象类型，这个时候其中的属性名、类型、方法都是确定的，但有时候并不提前知道类型属性的所有名称，在这种情况下，可以使用索引类型：

Typescript支持两种索引类型：字符串和数字
```ts
interface StringArray {
    [index: number]: string
}

let myArray: StringArray
myArray = ['peipei', 'wucj2', 'wupq']

let myStr: string = myArray[2]
console.log(myStr)
```
字符串索引签名能够很好的描述 dictionary 模式，并且它们也会确保所有属性与其返回值类型相匹配。
```ts
interface numArray {
    [index: string]: number
    length: number // ok
    name: string // 错误，`name`的类型与索引类型返回值的类型不匹配
}
interface numArray {
    [index: string]: number
    length: number // ok
}

let ageList: numArray = {
    'peipei': 32,
    'wucj2': 27,
    'wupq': 32,
    'length': 3
}

let myAge: number = ageList.wucj2
console.log(myAge) // 27
```
### 函数类型
前面我们都是通过interface来定义对象中普通的属性和方法的，实际上它也可以用来定义函数类型：
```ts
interface CalcFn {
    (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
    return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) => {
    return num1 + num2
}

calc(20, 30, add)
```
### 接口的继承
接口和类一样是可以进行继承的，也是使用extends关键字：
```ts
interface BasicAddress {
    name?: string
    street: string
    city: string
    country: string
    postalCode: string
}

interface AddressWithUnit extends BasicAddress {
    unit: string
}
```
一个接口可以继承多个接口，创建出多个接口的合成接口：
```ts
interface Colorful {
    color: string
}

interface Circle {
    radius: number
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
    color: 'red',
    radius: 42
}
```
### 交叉类型
接口允许我们通过扩展其他类型来构建新类型。TypeScript 提供了另一种称为交叉类型的构造，在开发中，通常是对对象类型进行交叉的：使用 & 运算符定义交集类型。
```ts
interface Colorful {
    color: string
}
interface Circle {
    radius: number
}

type ColorfulCircle = Colorful & Circle
```
### interface 和 type 区别
interface 和 type 都可以用来定义对象类型，那么在开发中定义对象类型时，到底选择哪一个呢?
  - 如果是定义非对象类型，通常推荐使用type
  - 如果是定义对象类，pinterface 可以重复的对某个接口来定义属性和方法，而type定义的是别名，别名是不能重复的。
```ts
interface IPerson {
    name: string,
    sayHi:() => void
}

interface IPerson {
    age: number
}

type Person {
    name: string,
    sayHi:() => void
}

type Person {
    age: number
}
// Person 报错
```
## 8. TypeScript泛型的使用
软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。
### 认识泛型
下面来创建一个使用泛型的例子：identity函数。 如果没有泛型，我们要么必须给标识函数一个特定的类型：
```ts
function identity(arg: number): number {
    return arg
}
```
或者，我们使用 any 类型来定义函数：
```ts
function identity(arg: any): any {
    return arg
}
```
虽然 any 是可以的，但是定义为 any 的时候，我们其实已经丢失了类型信息。比如我们传入的是一个 number，那么我们希望返回的可不是 any 类型，而是 number 类型。我们需要一种捕获参数类型的方法，以便我们也可以使用它来表示返回的内容。在这里，我们将使用类型变量，一种特殊类型的变量，它作用于类型而不是值。
```ts
function identity<Type>(arg: Type): Type {
    return arg
}

let output = identity<string>('myString')
let output = identity('myString')
```
这里我们可以使用两种方式来调用它：
  - 方式一：通过 <类型> 的方式将类型传递给函数；
  - 方式二：通过类型推到，自动推到出我们传入变量的类型
### 泛型变量
使用泛型创建像 identity 这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。以之前的例子为例：

如果想同时打印出 arg 的长度，直接打印 arg.length 将会报错，类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 .length 属性的。
```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length) // Error: T doesn't have .length
    return arg
}
```
由于我们操作的是数组，所以 .length 属性是应该存在的。 我们可以像创建其它数组一样创建这个数组：
```ts
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)  // Array has a .length, so no more error
    return arg
}
```
可以这样理解 loggingIdentity 的类型：泛型函数 loggingIdentity ，接收类型参数 T 和参数 arg，它是个元素类型是 T 的数组，并返回元素类型是 T 的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 T 的的类型为 number。

我们也可以这样实现上面的例子：
```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length)  // Array has a .length, so no more error
    return arg
}
```
### 泛型类型
泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
```ts
function identity<T>(arg: T): T {
    return arg
}

let myIdentity: <T>(arg: T) => T = identity
```
我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
```ts
function identity<T>(arg: T): T {
    return arg
}

let myIdentity: <U>(arg: U) => U = identity
```
我们还可以使用带有调用签名的对象字面量来定义泛型函数：
```ts
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: {<T>(arg: T): T} = identity
```
### 泛型接口
我们把上面例子里的对象字面量拿出来做为一个接口：
```ts
interface GenericIdentityFn {
    <T>(arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: GenericIdentityFn = identity
```
在类似的示例中，我们可能希望将泛型参数作为整个接口的参数。这让我们可以看到我们泛型的类型（例如Dictionary`<string>`，而不仅仅是Dictionary）。这样接口里的其它成员也能知道这个参数的类型了。
```ts
interface GenericIdentityFn<T> {
    (arg: T): T
}

function identity<T>(arg: T): T {
    return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```
### 泛型类
泛型类看上去与泛型接口差不多。 泛型类使用 <> 括起泛型类型，跟在类名后面。
```ts
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { 
  return x + y 
}
```
GenericNumber 类的使用是十分直观的，并且你可能已经注意到了，没有什么去限制它只能使用number类型。 也可以使用string或其它更复杂的类型。
```ts
let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function(x, y) { 
  return x + y
}
console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
```
### 泛型约束
有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：
  - 比如 string 和 array 都是有 length 的，或者某些对象也是会有 length 属性的。
  - 那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢。
```ts
interface Ilength {
    length: number
}

function getLength<T extends Ilength>(args:T) {
    return args.length
}

console.log(getLength(123)) // Argument of type 'number' is not assignable to parameter of type 'Ilength'.
console.log(getLength('123'))
console.log(getLength(['123','456','789']))
console.log(getLength({name: 'wupq', length: 175 }))
```
### 在泛型约束中使用类型参数
你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj 上，因此我们需要在这两个类型之间使用约束。
```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // ok
getProperty(x, 'm') //  Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

## 9. 枚举
使用枚举我们可以定义一些带名字的常量。


使用枚举可以清晰地表达意图或创建一组有区别的用例。

TypeScript支持数字的和基于字符串的枚举。

### 数字枚举
```ts
enum {
    Up = 1,
    Down,
    Left,
    Right
}
```
如上，我们定义了一个数字枚举，Up 使用初始化为1。 其余的成员会从1开始递增。 换句话说，Direction.Up 的值为1，Down 为 2，Left 为 3，Right 为 4。如果不初始化，Up 的值默认从0开始，然后递增。
```ts
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```
使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：
```ts
enum UserResponse {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
    console.log(recipient, message)
}

respond('Princess Caroline', UserResponse.Yes) //  'Princess Caroline',  1 
```
### 字符串枚举
在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
```ts
enum {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}
```
虽然字符串枚举没有自动递增的行为，但字符串枚举的好处是它们可以很好地“序列化”。
### 常数项和计算所得项
枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

每个枚举成员都带有一个值，它可以是常量或计算出来的。 当满足如下条件时，枚举成员被当作是常量：

它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值0：
```ts
enum E { X }
```
它不带有初始化器且它之前的枚举成员是一个数字常量
```ts
enum E1 { X, Y, Z }

enum E2 {
    A = 1, B, C
}
```
当一个表达式满足下面条件之一时，它就是一个常量枚举表达式：
  - 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
  - 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
  - 带括号的常量枚举表达式
  - 一元运算符+, -, ~其中之一应用在了常量枚举表达式
  - 常量枚举表达式做为二元运算符+, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象。
它不带有初始化器且它之前的枚举成员是一个数字常量
```ts
enum FileAccess {
    // 常量
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // 计算项
    G = '123'.length
}
```
### 联合枚举和枚举成员类型
存在一种特殊的非计算的常量枚举成员的子集：字面量枚举成员。 字面量枚举成员是指不带有初始值的常量枚举成员，或者是值被初始化为
  - 任何字符串字面量（例如：'foo', 'bar', 'baz'）
  - 任何数字字面量（例如：1, 2, 3）
  - 应用了一元-符号的数字字面量（例如：-1, -100）
当所有枚举成员都拥有字面量枚举值。
  - 枚举成员成为了类型
```ts
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle
    radius: number
}

interface Square {
    kind: ShapeKind.Square
    sideLength: number
}

let c: Circle = {
    kind: ShapeKind.Square, // 报错，kind只能是ShapeKind.Circle
    radius: 100
}
```
枚举类型本身有效地成为每个枚举成员的联合。
```ts
enum E {
    Foo,
    Bar
}
 
function f(x: E) {
    if(x !== E.Foo || x !== E.Bar) {
        // 报错，x只能 E.Foo 或者是 E.Foo，这个判断不会同时没有
    }
}
```
### 常量枚举
常量枚举是使用 const enum 定义的枚举类型，它具有一下特点：
  - 常量枚举只能使用常量枚举表达式
  - 在编译阶段会被删除
```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 生成后的代码为：
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]
```
### 外部枚举
外部枚举（Ambient Enums）是使用  declare enum 定义的枚举类型：
```ts
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```
外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常量成员。 对于非常量的外部枚举而言，没有初始化方法时被当做需要经过计算的。
## 参考
- [Typescript 官网](https://www.typescriptlang.org/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [从C#到TypeScript](https://www.cnblogs.com/brookshi/p/6361792.html)
- [ES6 入门教程](https://es6.ruanyifeng.com/)
