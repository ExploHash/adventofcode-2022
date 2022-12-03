use std::fs;

fn main(){
  let data = fs::read_to_string("./inputs/3.txt").expect("Unable to read file");
  let lines = data.split("\n");
  let mut sum_priority = 0;

  for line in lines {
    //Find double type
    let mut double_type: &str = "";
    let line_length = line.chars().count();
    let compartment_size = line_length / 2;
    for type_index in compartment_size..line_length {
      let compartment1 = &line[0..compartment_size];
      let type_str = &line[type_index..type_index+1];
      
      if compartment1.contains(type_str){
        double_type = &type_str;
      }
    }
    //Calculate priority
    if double_type != "" {
      let ch = double_type.chars().next().unwrap();
      let priority: u32;
      let ascii_char = ch as u32;

      if ascii_char > 64 && ascii_char < 91 {
        priority = ascii_char - 64 + 26;
      } else {
        priority = ascii_char - 96;
      }

      sum_priority += priority;
    }
  }

  println!("Sum of priorities: {}", sum_priority);
}