#include <stdio.h>
#include <string.h>
#include <stdint.h>

int main()
{
    char str[] = "hello";
    int l = sizeof(str);
    int i;
    for (i = 0; str[i] != 0; i++)
    {
        printf("str[%d]=%c\n", i, str[i]);
        printf("str[%d]=%c address=%p\n", i, str[i], (void *)&str[i]);
    }
    printf("size=%d\n", l);

    return 0;
}
