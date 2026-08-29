// #include <stdio.h>

// int main()
// {
//     const volatile int x = 10;

//     printf("x = %d\n", x);

//     x = 20; // ERROR: const variable cannot be modified
//     printf("x = %d\n", x);
//     return 0;
// }

// uisng the const pointer concept data is const but pointer is changable
// #include <stdio.h>

// int main()
// {
//     int a = 10;
//     int b = 20;

//     const int *p = &a;

//     printf("value = %d\n", *p);

//     // *p = 50;       // ERROR

//     p = &b; // OK

//     printf("value = %d\n", *p);
//     int c = 100;
//     p = &c;
//     printf("value = %d\n", c);

//     return 0;
// }

// pointer is constant, data is changeable.
#include <stdio.h>

int main()
{
    int a = 10;
    int b = 20;

    int *const p = &a;

    printf("value = %d\n", *p);

    *p = 50; // OK

    printf("a = %d\n", a);

    *p = &b; // ERROR
    printf("a = %d\n", *p);

    return 0;
}