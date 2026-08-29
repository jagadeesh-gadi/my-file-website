#include <stdio.h>

int main()
{
    char c = 'D';
    char d = 'F';

    char *const ptr = &c;

    printf("before \n");
    printf("character :: %c\n", *ptr);
    printf("address  :: %p \n", (void *)ptr);

    *ptr = 'X';

    printf("after value \n");
    printf("character :: %c \n", *ptr);
    printf("addrees  :: %p\n", (void *)ptr);

    // ptr = &d;  //address was not changed when const was decleared
    printf("addrees  :: %p\n", (void *)ptr);
    return 0;
}