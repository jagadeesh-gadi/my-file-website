#include <stdio.h>

int main()
{
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    int i;
    // every address of the elements
    for (i = 0; i < 5; i++)
    {
        printf("Element = %d\n", *p);
        printf("Address = %p\n\n", (void *)p);

        p++;
    }
    p = arr;
    printf("value[*p++] :: %d\n", *p++);                        // it will print before 10
    printf("post increment pointer point to data :: %d\n", *p); // afte that post increment value is  20

    p = arr;

    printf("value of (*p)++ :: %d\n", (*p)++);
    printf("post increment pointer point to data :: %d\n", *p); // afte that post increment value is  11
    printf("after increment array was ::\n");
    for (i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");

    p = arr;
    printf("*++p = %d\n", *++p);

    p = arr;
    for (i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
    printf("++*p = %d\n", ++*p);
    for (i = 0; i < 5; i++)
    {
        printf("%d ", arr[i]);
    }

    printf("\n");

    return 0;
}