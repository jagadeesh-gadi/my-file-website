#include <stdio.h>
struct basics
{
    int roll;
    char name[20];
    float marks;
} b1, b2;

int main()
{
    struct basics b1 = {101, "ravi", 80.90};
    b1.roll = 101;
    b1.name[10] = "ravi";
    b1.marks = 80.09;
    struct basics b2 = {102, "jagadeesh", 8090.0};

    b2.roll = 102;
    b2.name[10] = "jagadeesh";
    b2.marks = 90.90;
    printf("student 1 \n");
    printf("b1 = %d\n", b1.roll);
    printf("b1 = %s\n", b1.name);
    printf("b1 = %f\n", b1.marks);
    printf("student 2 \n");
    printf("b2 = %d\n", b2.roll);
    printf("b2 = %s\n", b2.name);
    printf("b2 = %f\n", b2.marks);

    return 0;
}