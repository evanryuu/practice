fn main() {
    push_str();
}

fn push_str() {
    let mut s = String::from("Hello ");
    println!("初始字符串 -> {}", s);
    s.push_str("rust");
    println!("追加字符串 push_str() -> {}", s);

    s.push('!');
    println!("追加字符 push() -> {}", s);
}
