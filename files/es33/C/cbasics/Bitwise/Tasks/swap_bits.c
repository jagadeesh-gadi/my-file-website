#include <stdio.h>

int main()
{
    char a[20];

    scanf("%s", &a);
    printf("before swaping :: %s\n", a);

    a[0] = a[0] ^ a[1];
    a[1] = a[0] ^ a[1];
    a[0] = a[0] ^ a[1];
    

    printf("after swaping :: %s\n", a);
    return 0;
}