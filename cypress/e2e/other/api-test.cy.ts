/// <reference types = "cypress"/>

describe("Get Request", () => {
  var result;
  it("Validate status code of the /posts api", () => {
    result = cy.request("http://localhost:3000/posts");
    result.its("status").should("equal", 200);
  });

  it("Create post via api /posts",()=>{

    cy.request({
        method:"POST",
        url:"http://localhost:3000/posts",
       
        body:{
            title:"you want to learn automation?",
            author:"Anuta"
        }
    }).then((response)=>{
        expect(response.status).equal(201)
    })
  })
  it("Validate that posts api contains correct keys and values", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/posts",
      headers: {
        accept: "application/json",
      },
    }).then((response) => {
      let body = JSON.parse(JSON.stringify(response.body));
      cy.log(body);
      expect(body[0]).has.property("title", "json-server");

      body.forEach((element: any) => {
        expect(element).to.have.all.keys("id","title","author");
      });
    });
  });
});
