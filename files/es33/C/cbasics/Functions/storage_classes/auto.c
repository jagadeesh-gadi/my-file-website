#include <stdio.h>
// auto  int b=20; //auto storage class wont work in this type of global variables.
static int b; // by declaare the storge class as static then it will work in the global variable.
int main()
{

    {
        auto int a = 10;
        printf("local variable inside the block a :: %d\n", a); // it can access here other side of block wont access
        printf("loacal variable block address of a  :: %p\n", (void *)&a);
    }
    // printf("inside the another block :: %d", a); // it cannot be  access here because
    // inside of block of code only access

    printf("gloabl variable the another block b :: %d\n", b);         // we can access refreing the storage class in the gloabal varible
    printf("global variable block address of b :: %p\n", (void *)&b); // we can get the address of the gloabal variable

    return 0;
}