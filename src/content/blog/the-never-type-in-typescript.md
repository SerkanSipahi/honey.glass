---
title: 'The never type in TypeScript'
excerpt: 'The greatly underestimated and often overlooked never type is a core Type in the TypeScript type hierarchy. TypeScript itself says: "The never type represents the type of values that never occur." Even though it is said to never appear, it is omnipresent.'
publishDate: 'February 18 2024'
tags:
  - typescript
  - types
  - never
isFeatured: true
seo:
  image:
    src: '/white-hole.webp'
    alt: White hole
---

![Light lines on a dark background](/white-hole.webp)

In this article, I want to share my perspective to the topic of "never" type in TypeScript. It offers deep insight but from a different viewpoint. A perspective where one can grasp things on a higher level without delving too much into the extreme details. Others have already provided this deep insight very well in other articles and answered it in numerous StackOverflow responses.

In certain sections of the article, I will discuss some edge cases and limitations of the never type in TypeScript. These examples should be considered as additional information to the TypeScript documentation.

At the end of the article, you will find an interesting reference to another article to the "never" type. Both articles, this and the reference, comprehensively cover the subject. Additionally, in this article, I frequently refer to Stackoverflow and the TypeScript documentation.

**Typesetting conventions**

**^?**<br>
In the code examples, I use the "^?" annotation in the code examples to show the expected TypeScript type in the TypeScript Playground, making it easier to understand the compiler's expected type.

## The never type

The greatly underestimated and often overlooked **never** type is a core Type in the TypeScript type hierarchy. TypeScript itself says: "The **never** type represents the type of values that never occur." Even though it is said to never appear, it is omnipresent. The **never** type holds the same significance as the other types we know from TypeScript, with the difference that it has no value or cannot take one, and therefore stands at the very bottom of the hierarchy.

The **never** type is a powerful Type that helps us build stable, predictable, and controllable applications at the type level.

![Typescript Type Hierarchy by O'Reilly](/typescript-hierarchy.png)

## The never type can result from an implicit or explicit behavior

Before diving deeper into the **never** type, I want to address two points that we will explore further in this article. Essentially, it's about when one is confronted with the **never** type.

> **Implicit:** TypeScript uses 'never' when it cannot find a matching type for a value. This occurs, for example, in cases where the code cannot be narrowed down to any other specific type.

> **Explicit:** As developers, we can use 'never' to intentionally control type flows, for example, in libraries

Firstly, if TypeScript cannot do anything with a type or cannot narrow it down to a type value (for example, string, number, array), it becomes a **never** type. This can happen implicitly from the TypeScript compiler without us having to do anything directly. Secondly, as a library/utils developer, one can explicitly create a **never** to consciously direct and control the flow of one or more types. In most cases, one is confronted with the first scenario.

## When the never type results from implicit behavior

**When throwing an error, the never Type is in play**

You don't have to be a library/utils developer to encounter the **never** type. It can quickly happen that TypeScript narrows your value to **never**. In our first real-world example, it's not immediately apparent that we have created a return type of **never** | **string**. Where did the **never** go?

[TypeScript Playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBA5gUzAgTgQyggqgVwJYAmMAvDABQ74EBcM0KeYcMAPjDmAQgGaMIEBKEgD4YAbwCwAKBgw83clACeABwQgFlQiWKkA5By69kBPUMkzZMKAAsUIAO4xkTgKIp7KMgaowAtjjQMABGCDBGfKYCANzSsgC+0nEwKAhQOChg7L4A1DAAshg2AHTonCB+ZDHS8bFS0ojI6Ji4hN5gaH4IZnUA9L0wAHoA-EA)

```ts
const generateUuid = (uuid: string | undefined) => {
  if (typeof uuid === 'undefined') {
    throw new Error('uuid must be defined');
  }

  return uuid + Math.random();
};

generateUuid('name');
// ^? string
```

> [**TypeScript**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type): Because never is a subtype of every type, it is always omitted from union types and it is ignored in function return type inference as long as there are other types being returned

When we break down the function **generateUuid** to examine it in detail, we can confirm and prove the statement from TypeScript. If we remove everything out in the code and leave only the exception, the return type of the function is **never**. This means that we can confirm the statement from the TypeScript documentation. Since we haven't created any other return types, it remains the **never** type.

It is **always omitted** from union types, and it is **ignored in function return type** inference as long as **other types are being returned**.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBA5gUzAgTgQyggqgVwJYAmMAvDABQ74EBcM0KeYcMAPjDmAQgGaMIEBKEgD4YAbwCwAKBgwoACxQgA7jGSqAoiiUoyAckqEYAWxzQYAIwQwuvZAT0CA3NIC+LqdMTJ0mXIX0wNGMERw8AenCYAD0AfiA)

```ts
const generateUuid = (uuid: string | undefined) => {
  throw new Error('uuid must be defined');
};

generateUuid('name');
// ^? never
```

When we return some value, the return type becomes a string, and the actual statement from the TypeScript documentation is 100% correct. The critical point in our example is the **throw**. This leads to an exception, which ultimately results in a **never**. However, with another return type string (**return uuid + Math.random() )**, the **never** is ignored. It is important to read the documentation instead of making assumptions.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBA5gUzAgTgQyggqgVwJYAmMAvDABQ74EBcM0KeYcMAPjDmAQgGaMIEBKEgD4YAbwCwAKBgw83clACeABwQgFlQiWKkA5By69kBPUMkzZMKAAsUIAO4xkTgKIp7KMgaowAtjjQMABGCDBGfKYCANzSsgC+0nEwKAhQOChg7L4A1DAAshg2AHTonCB+ZDHS8bFS0ojI6Ji4hN5gaH4IZnUA9L0wAHoA-EA)

```ts
const generateUuid = (uuid: string | undefined) => {
  if (typeof uuid === 'undefined') {
    throw new Error('uuid must be defined');
  }

  return uuid + Math.random();
};

generateUuid('name');
// ^? string
```

## Edge-Cases and limitation for the never type in function declarations and control flow analysis

As in any language, there are edge cases in TypeScript as well. In our example generateUuid, I used a **function expression** instead of a **function declaration**. The return type behaves slightly differently in function declaration.

**Function expression**

```ts
const f = function () {
  //  ^? never
  throw new Error('error');
};
```

**Function declaration**

```ts
function h() {
  //     ^? void
  throw new Error('error');
}
```

> [**Stackoverflow**](https://stackoverflow.com/questions/40251524/typescript-never-type-inference#40251686): The difference is that 'f' is function expressions, where 'h' is a function declaration. When a function is throw-only, it gets the type never if it's an expression, and void if it's a declaration

## Union Types and never

There are two more scenarios where one might encounter the **never** type during development. First, in a **switch** statement and second, in an **if-else** where Union Types are gradually narrowed down, which can ultimately end in a **never** type because there is nothing left to resolve.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwghgJygXigbyqSAuKByAY0TwG4oBnSCAE1wDsBXAWwCMIkBfEgWACgtoAIQCWBEAQA20VBgG48LUeKmkKVWlEat2ULnwFQAahAAWoqSliIoAHygixkiD158AZgzoFgwgPZ0oal8AZV8mCGAzOgBzAHVhSOCAdwSCE3hyCAAKADdTcwhyXGMzJwBKdD4oChTgNKhc-KdyADoBCrQq6qgiTPwiBDxsLu6oPNKpVsoIGhdR6oB6BfnqgD0AfhHulgQIOABrOe7e6AUlJyGt6vGCqfUj0aWVqA2rqB29w63qCDc4BgkwGGvBWN2aD26T1eIPmHwORw4fERrl4Hi8Pn8gRCYQiUTiCRMAEk3ABRCSZRoTCDFJpSDpdYRuBpgqRtcDSZCoQjEekw660iAtaazLZPebQ6ocKAQcnQRnMgVsyAoTn4RSOFS80YswXC6gQsXizYwqUyvqdPljAUG5YS3RIoA)

```ts
type Car = { type: 'car'; speed: number };
type Bicycle = { type: 'bicycle'; speed: number };
type Vehicle = Car | Bicycle;

function doSomethingWithSwitchCase(vehicles: Vehicle) {
  switch (vehicles.type) {
    case 'car':
      vehicles.speed;
      //       ^? number
      break;
    case 'bicycle':
      vehicles.speed;
      //       ^? number
      break;
    default:
      vehicles;
      // ^? never
      break;
  }
}

function doSomethingWithIfElse(vehicle: Vehicle) {
  if (vehicle.type === 'car') {
    vehicle.speed;
    //      ^? number
  } else if (vehicle.type === 'bicycle') {
    vehicle.speed;
    //       ^? number
  } else {
    vehicle;
    // ^? never
  }
}
```

We should have noticed one thing in all our examples (throw error, switch-case, if-else). Essentially, TypeScript is just representing the behavior of JavaScript, with the difference that it happens at compile time.

An exception, for example throwing an error, in the browser is a **never** in TypeScripts at compile time, and code sections that are unreachable or not can be narrow it down in a **switch** statement or an **if-else** will end up in a **never**. It's all quite logical when you think about it. The **never** type is a useful tool; it helps us detect incorrect behavior in the code before it happens in the browser.

## Infinite Loops and 'never'

After discussing many aspects of the **never** type, the last implicit example are **loops** and **never**. So, I will keep this brief. The return type after an infinite loop, from a function, always results in a **never**.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBANiEAHAjDAvDAZgVzMKAS3BgAoBKGAbwFgAoGGAdwAtC4BTMqAJxw8pUAvvSEBuegmQoKEugHp5MAHoB+evVCRYUpACYMZSugB81eoywgeZMWMEi64jXV17Z9RStVA)

```ts
const loop1 = function () {
  while (true) {}
};
loop1();
// ^? never

const loop2 = () => {
  for (;;) {}
};

loop2();
// ^? never
```

The following code isn't part of the article, but from my own experience, I can say it's not great to have question marks in your head. You might be wondering in what situations one would use an infinite loop without crashing the runtime (Browser, Node, Bun, Deno). A self-contained functional unit you could, for example, wait every {n} seconds in a while loop to output the date. The possibilities here are limitless.

```ts
const clock = async function () {
  while (true) {
    await new Promise((resolve) => {
      console.log(new Date().toString());
      setTimeout(resolve, 1000);
    });
  }
};

clock(); // logs asynchronusly the date every 1000ms

// ... do something
// ... do something
// ... do something
```

**It's the small, unassuming details**

It is clear from the TypeScript documentation about the **never** type in which cases it can lead to a **never**, but my experience has shown that not much attention is paid to the small details (documentation).

> [**TypeScript**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type): Because never is a subtype of every type, it is always omitted **from union types** and is ignored **in function** return type inference as long as there are other types being returned

Indeed, **never** can arise or be ignored from Union Types or from the return type of a **function**. As you may have noticed, our examples are around functions. If we executed the code examples not within a function but in a .ts file, this would lead to **unreachable-code**. Essentially, it's almost the same, with the small but significant difference that **never** is a type one can work with on type-level, and **unreachable code** is just a statement from the TypeScript compiler that does not lead to an error.

**Edge Cases, Loops, and the 'never'**

The **never** type represents impossible values in TypeScript. However, if values can be modified at runtime in ways the compiler can't predict, guaranteeing these impossible values never occur becomes technically challenging.

TypeScript leaves the type in the state it would be if it weren't **never**. That's why the return value in loop1 is **void** and not **never**, because the **Infinity** object hangs on the global **window** object and could theoretically be overwritten, like **window.Infinity = 1**, making the loop finite.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBANiEAHAjDAvDAFASgwPhgG8BYAKBhgDMQAnbOAU1gEsMYAGAbhjYB4YASTBUWYFlACePFgGpZeIgF9ySruXIJkKXOrIB6fTAB6AfiA)

```ts
const loop1 = () => {
  for (let i = 0; i < Infinity; i++) {}
};

loop1();
// ^? void
```

## When the never type results from explicit behavior

The explicit creation of the **never** type can happen in several ways. Firstly, when we write our utility types or when we work as library developers. Strictly speaking, utility types are **generics**.

> [**TypeScript**](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type): Because never is a subtype of every type, it is **always omitted from union types** and is ignored in function return type inference as long as there are other types being returned

Secondly, it happens automatically when we use the built-in utility types (Exclude, Extract, Omit, [more Utility-Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)) from TypeScript. Let's make a little excursion into the world of conditional types and generics to understand the behavior of the **never** type in this context.

**What we see as a developer when we deal with Utility-Types:**

[TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECMFcEsBsBcC00B2pLzteBPUuAHAU1FVABUBlAWAChCSBRADwGNZIATIgHnIBpQAVQB8oALwVQRZvCIpOAZ2GgA-KBREAbkQBOoAFwUA3HToNQAMQD21iaBbsuvRfF2oA5qAA+GyAFtwPR8IW1giAEMUQXAwyJQRU1oQUFSAPVUzehxiUAAhCP1JFjcI1ngeV3cUL18UAKD9X1jrcKiYuKjEuhT01SA)

```ts
// built-in utility type in TS
type Exclude<T, U> = T extends U ? never : T;

type Foo = Exclude<string | number | boolean, boolean>;
//   ^? string, number

type Bar = Extract<string | number | boolean, boolean>;
//   ^? boolean
```

**What TypeScript sees and does:**

In the first step TypeScript **[distribute the types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)**. This means that **string | number | boolean** will be distributed over the Exclude Utility-Type.

```ts
type Foo = Exclude<string, boolean> | Exclude<number, boolean> | Exclude<boolean, boolean>;
//   ^? string | number | never
```

The second step TypeScript fills the placeholder **T** and **U** with the passed types.

```ts
type Foo =
  | (string extends boolean ? never : string) // resolved to string
  | (number extends boolean ? never : number) // resolved to number
  | (boolean extends boolean ? never : boolean); // resolved to never
//   ^? string | number | never
```

In the third step the conditions will be resolved so that only the types are left, including the **never** type.

```ts
type Foo = string | number | never;
//   ^? string | number | never
```

In the last step, the **never** will be ignored from the Union Types

```ts
type Foo = string | number;
//   ^? string | number
```

I just wanted to illustrate that the **never** type disappears or **ignored** as already quoted several times from the TypeScript documentation. But basically, it is not the conditional types in the generic that makes the magic. The following example sums it up and confirms the TypeScript documentation once again. The **never** type is omitted from union types.

```ts
type Bar = string | boolean | number | never;
//   ^? string | boolean | number
```

## TypeScript tries to reflect the behavior of JavaScript as much as possible

TypeScript has special operators that are deeply embedded in the language and its syntax. This special syntax can be used as a tool to fulfill a specific purpose of a developer. An example of a special operator is the **keyof** operator, but before we look at the details we should consider the following example from the core of JavaScript.

```ts
const result = Object.keys({}); // logs: []
```

The counterpart to **Object.keys** is the **keyof** from TypeScript, which can be used to get the keys of an object at compile time.

```ts
type Result = keyof {};
//   ^? never
```

If we apply a `keyof` to an empty object type in TypeScript we get **never**. The same applies to JavaScript. In both cases an empty object cannot contain anything.

As we've learned in the article, TypeScript essentially tries to mirror the behavior of JavaScript at compile time on a type level.

```ts
// TypeScript compiler
type StringKeys = keyof { name: 'Tim'; country: 'Belgium' };
//   ^? name | country

// JavaScript in the Browser
const someString = { name: 'Tim', country: 'Belgium' };
Object.keys(someString); // logs: ['name', 'country']
```

## Variables, Functions, and the 'never' Type

**Variable assignment and the 'never' Type**

When we try to assign a value to the 'never' type, for example during a variable declaration, it behaves like a white hole ([White Hole - Wikipedia](https://en.wikipedia.org/wiki/White_hole) - the opposite of a black hole). It lets nothing in. Every other type that wants to go to the other side (e.g., value1) will rejected. Simply put, the values **1**, **Hello World** and **true** are not subtypes of 'never' (except 'never' itself). Not even 'any' can be assigned to the 'never' type.

> [**TypeScript**](https://www.typescriptlang.org/docs/handbook/basic-types.html#never): The 'never' type is a **subtype of**, and assignable to, **every type**; however, **no type is a subtype** of, or **assignable to, 'never'**, (except 'never' itself). Even 'any' isn’t assignable to 'never'

[TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAEDUEMCcEtIEYBsCmA7UAtArgdxbAM7ZoDmoJAJqJZIaGigG4rSgAuAngA4oCwAKBCgAFACYAlIIDGAezSF2oJpCTYUARgBcDZq1ABeUBoDcoYQFFo0WdB1deDbAFsE+og1lK6hWKTSIqByyHDwouizQgsKgsQB6APwy8orKqupiOoyRhqAA5AASKEhIIQDqtkiUeWaW1rb2YaCKcGSgHmheoD5+Acjh7CEO4dms0WCxoInJCkoqaigAzFl6bEbs0Oq1YFY2dqGOCLKyqJAYHV09-oEDQ02jUUIT8QkRYwIzqWecUAs637lTJ85ukUAAWFY5IzfX5bcw7er7AAqTQBF28hF8136wQOI1W40mU1egkJIg0UgEclmaQWELea1EIgkhgAfKAAN6CIkxaYCWLCOTWFDSdgAGgZ7XoVz6QUGDNJ-I4AAsbLhdOrdrYRHk8hITIIAL4SZkmIA)

```ts
// Error: type number is not assignable to type never
const value1: never = 1;
//    ^? never

// Error: type string is not assignable to type never
const value2: never = 'Hello World';
//    ^? never

// Error: type boolean is not assignable to type never
const value3: never = true;
//    ^? never

const anyValue: any = 1;
// Error: Type any is not assignable to type never
const value4: never = anyValue;
//    ^? never

// correct, never is assignable to never
const value4: never = (() => {
  //  ^? never
  throw new Error('');
})();
```

**Function arguments and assignability of variables to the never type**

In the example above we have looked at a very theoretical and not practice-orientated variant of what happens when you try to assign values to a **never** type. In reality, and in most cases, this compile-time error occurs when you pass the return values from one function to another function. This is the only difference to the example above.

[TypeScript Playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABBAhmAKig1gUwIIBOA5gIwAUwccAXIuFmHAO5IA+iAzlATGEYuzAgAtgCMcBAYlFUANjjQBKRAG8AsAChE2xARxQQBJAHIA6gE8IsmMGA5jmnYgC+miAi6IoACwLMAogR+BCSIALyIZMphAHyqjl6+zIhgOEyIgcFkxhLBxooA3JrORRqaAPTlyHBBONC0bmiYuISkZD5+TJk15IqFFVUAegD8mpqgkLAIyE3Y+MQATBRUtKkAbhLKKq4a7mCeHQFBNQvhkdFx6lrV+1CIlDR0YAzMSBEkpdp6Bkb3VKUlMa7WYtRbtJJdY4EJZ9AqISqIVoiHBgO5wYBecwABxwTxeLEQMA4KTgdxQHA4MCIYBQonkXjgiCxKAIKGE+gkiHRmJxKRwGwIA0QIyAA)

```ts
function canTakeArg1(foo: unknown | string | number | boolean) {
  return 'Wycliffe';
}
const throwError1 = () => {
  throw new Error('error');
};

// correct: never is a subtype of string or of every type
canTakeArg1(throwError1());
// ^? string

function canTakeArg2(foo: never) {}
const throwError2 = () => {
  const foo: unknown = 1;
  return foo;
};

// error: unknown or other types are not a subtype of never
canTakeArg2(throwError2());
// ^? void
```

## Weird at first glance but it is a design decision from TypeScript

It's not necessary to remember the next code examples in detail, but reading about it once helps our brain to recall it more easily the next time.

If you ever encounter one of these cases (1, 2, or 3) and wonder why in **case 1** you receive a boolean and in another **case 2** a never instead of the expected boolean (true), and you are puzzled why you can circumvent it in **case 3** by using a so-called **[non-naked](https://stackoverflow.com/questions/51651499/typescript-what-is-a-naked-type-parameter#51651684)** type, then do not be surprised. This is a design decision and not a bug in the TypeScript compiler.

> [**Nurbol Alpysbayev**](https://stackoverflow.com/users/9259778/nurbol-alpysbayev): You are distributing an empty union aka 'never' and this gives a result of the distribution of an empty union (aka 'never'): that is another empty union! Completely makes sense

[TypeScript Playground](https://www.typescriptlang.org/play?ssl=14&ssc=8&pln=1&pc=1#code/PTAEAoEYEpQYQPYDsAmBLALm5BDANqACoCeADgKYCwAUBmeaAGIIKgC8oS5AbuQE6hyADwzlUAZ049+oAPygMfAK4MAXKABm+ceQDcNEKCMA9WTQNhwAJlgBxMfzQBjUAHdMAC044A1uRTwyOhYuAQkFDR0FKAAQjh8APqQADyEAHzsRIIiYiiSXLwC8ooqoOpaeDr61IZICBigAAYl5I2gOJLCFE6iAQBGSg0AVEMF-CMAhJH0sTgAXkmZcYkpY3xp1YYmZtQWEADMdg58zm6enMjkALRIvv6BqJjYt2H009HLCVapGRwA2oQALrZUQSUB-NbA4rKNSabR6d4MOILKxLeJfZJrDZ7bZAA)

```ts
// Cases 1, 2, and 3

// (1) Conditional Type
type Foo = never extends never ? true : false;
//   ^? true

// (2) Generic with naked Conditional Type
type Bar<T> = T extends never ? true : false;
// not `true` as expected but **never**!
type Baz = Bar<never>;
//   ^? never

// (3) Generic with none-naked Conditional Type
type Lorum<T> = [T] extends [never] ? true : false;
type Ipsum = Lorum<never>;
//   ^? true
```

## Exploring other(s) perspectives of the 'never' type can be useful

Unfortunately, I can't cover everything about the **never** type in this article. That would exceed the scope of the topic. I intended to show and share my perspective on things. Many great articles on the web have already explored other aspects of the **never** type. Here is a really interesting article that I find very insightful from **Zhenghao's** Blog about the [**never Type**](https://www.zhenghao.io/posts/ts-never)

**Conclusion**

In conclusion, we can say that we encounter the never in two different ways. Once implicitly, when TypeScript is not able to determine a type, and explicitly, when we as developers want to consciously control the type in utility types. We can also note that the never type is always removed from union types and ignored in functions as long as other types are returned. There are edge cases here and there. You don't need to memorize these, but you do need to be aware of them.

**Thanks**

Many thanks to [Maina Wycliffe](https://twitter.com/mwycliffe_dev) and [Tim Deschryver](https://twitter.com/tim_deschryver) for reviewing this article. I appreciate your time and effort. I am grateful for your support.

You can find me on [Twitter](https://twitter.com/Bitcollage), [GitHub](https://github.com/SerkanSipahi), [LinkedIn](https://www.linkedin.com/in/serkan-sipahi-59b20081/) and [XING](https://www.xing.com/profile/Serkan_Sipahi2/). I'm looking forward to connecting with you and sharing our knowledge. Let's make the world a sweeter place together!
