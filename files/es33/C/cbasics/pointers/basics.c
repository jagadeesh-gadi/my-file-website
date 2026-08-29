#include <stdio.h>

int main()
{
    int a = 10;
    int *ptr;

    printf("=======before the value initilization======\n");
    // before the value initilization
    printf("value = %d\n", a);
    printf("address [a]= %p\n", (void *)&a);
    printf("address [*ptr]= %p\n", ptr);

    printf("=======after pointer initilization======\n");
    // after pointer initilization
    ptr = &a;
    // printf("%d\n", &ptr); // it will thorugh some grabage values
    printf("address of a uisng pointer :: %p\n", &a);
    printf("address of ptr after initilization :: %p\n", ptr);

    // using the relationship operator
    printf("======using the relationship operator======\n");

    if (ptr == &a)
    {
        printf("addres of [a] :: %p and ptr[ptr] :: %p \n", &a, ptr);
    }
    if (*ptr == a)
    {
        printf("values of [a] :: %d and ptr[ptr] :: %d \n", a, *ptr);
    }

    // unary operator using that
    printf("=======unary operator==========\n");
    printf("%d\n", -a);
    printf("%d\n", +a);
    // printf("%d\n", *a);

    return 0;
}