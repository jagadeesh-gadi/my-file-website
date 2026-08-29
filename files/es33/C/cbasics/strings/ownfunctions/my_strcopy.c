#include <stdio.h>

int strcopy(char *arr1, char *arr2)
{
    char *p1 = arr1;
    char *p2 = arr2;
    while (*p1 != '\0')
    {
        *p2 = *p1;
        p1++;
        p2++;
    }
    *p2 = '\0';
    printf("str copy of arr2 :: %s", arr2);
}
int main()
{
    char arr1[20];
    char arr2[30];
    fgets(arr1, 20, stdin);
    strcopy(arr1, arr2);
    return 0;
}