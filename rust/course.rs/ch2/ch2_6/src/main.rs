fn main() {
    simple_match();
    if_let();
    my_filter();
}

fn simple_match() {
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter,
    }

    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            Coin::Penny => {
                println!("Lucky Penny");
                1
            },
            Coin::Nickel => 5,
            Coin::Dime => 10,
            Coin::Quarter => 25
        }
    }
    let dime_coin = Coin::Dime;
    let penny_coin = Coin::Penny;
    let nickel_coin = Coin::Nickel;
    let quarter_coin = Coin::Quarter;
    println!("result is {}", value_in_cents(dime_coin));
    println!("result is {}", value_in_cents(penny_coin));
    println!("result is {}", value_in_cents(nickel_coin));
    println!("result is {}", value_in_cents(quarter_coin));
}

fn if_let() {
    let v = Some(3u8);

    if let Some(3) = v {
        println!("three");
    }
}

fn my_filter() {
    enum MyEnum {
        Foo,
        Bar
    }
    let v = vec![MyEnum::Foo,MyEnum::Bar,MyEnum::Foo];
    v.iter().filter(|x| matches!(x, MyEnum::Foo));
    let arr = [1, 2, 3, 3];
    let arr1: Vec<_> = arr.iter().filter(|x| x == 3).collect();
    println!("{:?}", arr1);
}
