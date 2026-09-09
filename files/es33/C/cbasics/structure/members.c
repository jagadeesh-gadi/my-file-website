// access memeber using the structures
#include <stdio.h>
#include <string.h>
struct members
{
    int id;
    char name[20];
    char grades;
    float marks;
} m1, m2;

int main()
{
    //struct members m1 = {101, 'A', 90.09};
    //struct members m2 = {102, 'B', 99.09};

   // m1.id = 101;
    //strcpy(m1.name,);
  //  m1.grades = 'A';
   // m1.marks = 90.09;
    m2.id = 102;
   // strcpy(m2.name, "jagadeesh");
    m2.grades = 'A';
    m2.marks = 99.09;
    printf("first member\n");
    printf("m1 id= %d\n", m1.id);
    printf("m1 name = %s\n", m1.name);
    printf("m1 grades = %c\n", m1.grades);
    printf("m1 marks = %f\n", m1.marks);
    printf("2nd members \n");
    printf("m2 id= %d\n", m2.id);
    printf("m2 name = %s\n", m2.name);
    printf("m2 grades = %c\n", m2.grades);
    printf("m2 marks = %f\n", m2.marks);
    return 0;
}
