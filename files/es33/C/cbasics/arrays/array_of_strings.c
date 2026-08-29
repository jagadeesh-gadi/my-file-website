#include <stdio.h>

int main()
{
    char *fruits[] = {"apple", "banana", "orange", "mango", "grapes"};
    fruits[4] = "dragon fruit";
    int size = sizeof(fruits) / sizeof(fruits[0]);
    printf("array of strings\n");
    for (int i = 0; i < 5; i++)
    {
        printf("fruits[%d]=%-8s address = %p\n", i, fruits[i], (void *)fruits[i]);
    }
    return 0;
}