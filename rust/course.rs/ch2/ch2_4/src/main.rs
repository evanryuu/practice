fn main() {
    push_str();
    insert_str();
    replace_str();
    pop_str();
    chars();
    tuple()
}

fn tuple() {
    fn calculate_length(s: String) -> (String, usize) {
        let length = s.len();

        return (s, length)
    }
    let s  = String::from("hello");
    let (something, len) = calculate_length(s);
    println!("something is: {}, length is {}", something, len)
}

fn push_str() {
    let mut s = String::from("Hello ");
    println!("初始字符串 -> {}", s);
    s.push_str("rust");
    println!("追加字符串 push_str() -> {}", s);

    s.push('!');
    println!("追加字符 push() -> {}", s);
}

fn insert_str() {
    let mut s = String::from("Hello rust!");
    s.insert(5, ',');
    println!("插入字符 insert() -> {}", s);
    s.insert_str(6, " I like");
    println!("插入字符串 insert_str() -> {}", s);
}

fn replace_str() {
    let s = String::from("I like Rust! Rust is my favorite!");
    let s1 = s.replace("Rust", "rust");
    println!("replace: {}", s1);
    let s2 = s.replacen("Rust", "rust", 1);
    println!("replacen: {}", s2);
}

fn pop_str() {
    let mut s = String::from("rust pop 中文!");
    dbg!(s.pop());
}

fn chars() {
    for c in "中国人hello".chars() {
        println!("{}", c);
    }
}
