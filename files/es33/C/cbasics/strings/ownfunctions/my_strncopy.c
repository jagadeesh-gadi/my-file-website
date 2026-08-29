#include <stdio.h>
void strncopy(char *arr1, char *arr2, int n)
{
    char *p1 = arr1;
    char *p2 = arr2;
    while (*p1 >= '\0' && n > 0)
    {
        *p2 = *p1;
        p1++;
        p2++;
        n--;
    }
    p2 = '\0';
    printf("arr2 ouput is:%s\n", arr2);
}
int main()
{
    char arr1[20];
    char arr2[20];
    int n;
    fgets(arr1, 20, stdin);
    scanf("%d", &n);
    strncopy(arr1, arr2, n);
    return 0;
}