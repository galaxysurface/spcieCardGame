import { ImageSourcePropType } from "react-native"


export type dataType = {
  name: string,
  age: number,
  image: string,
  color: string,
}

export const data: dataType[] = [
    {
      "name": "Alice",
      "age": 28,
      "image": "[1](https://randomuser.me/api/portraits/women/1.jpg)",
      "color": "#1cc"
    },
    // {
    //   "name": "Bob",
    //   "age": 32,
    //   "image": "[2](https://randomuser.me/api/portraits/men/2.jpg)",
    //   "color": "#1c6"
    // },
    // {
    //   "name": "Charlie",
    //   "age": 24,
    //   "image": "[3](https://randomuser.me/api/portraits/men/3.jpg)",
    //   "color": "#169"
    // },
    // {
    //   "name": "David",
    //   "age": 29,
    //   "image": "[4](https://randomuser.me/api/portraits/men/4.jpg)",
    //   "color": "#c9c"
    // },
    // {
    //   "name": "Eve",
    //   "age": 26,
    //   "image": "[5](https://randomuser.me/api/portraits/women/5.jpg)",
    //   "color": "#1c1"
    // }
  ]
  