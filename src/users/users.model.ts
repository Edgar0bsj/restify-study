const users = [
  { id: "1", name: "Peter Parker", email: "peter@marvel.com" },
  { id: "2", name: "Bruce Wayne", email: "bruce@dc.com" },
];

export class User {
  static findAll(): Promise<any[]> {
    return Promise.resolve(users);
  }

  static findById(id: string): Promise<any> {
    return new Promise((resulv) => {
      let filterId = users.filter((element) => {
        return element.id === id;
      });
      let user = undefined;

      if (filterId.length > 0) {
        user = filterId[0];
      }

      resulv(user);
    });
  }
}
