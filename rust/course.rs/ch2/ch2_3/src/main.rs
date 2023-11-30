fn borrow_value_example() {
    let num1 = 3;
    let num2 = num1; // 简单类型数据可以被借走
    let s1 = String::from("Hello");
    let s2 = s1; // Rust永远不会自动创建数据深拷贝，复杂数据类型重新赋值时不会进行浅拷贝，而会直接转移使用权
    let s3 = s2.clone(); // 实在需要的话深拷贝的话可以使用String内置的clone方法

    println!("{}, {}", num1, num2);
    println!("{}, world! {}", s1, s3);
}

fn takes_owner_ship(some_string: String) -> String {
    println!("{}", some_string);
    some_string
}

fn dangle() -> &String {
    let s = String::from("hello");
    &s
}

fn main() {
    borrow_value_example();
    // 进入函数之后也会直接take所有权，必须要用另一个变量接住
    // 这样就很麻烦，所以我们就有了引用与借用的概念
    let s = String::from("hello");
    let s1 = takes_owner_ship(s);
    println!("after ownership being taken, {}", s1);
}
