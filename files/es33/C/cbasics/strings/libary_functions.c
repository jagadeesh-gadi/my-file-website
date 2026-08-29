// update the old stirng to new strings usig the pointer function

#include <stdio.h>
#include <string.h>
void update_str(char *str)
{
    char new_str[] = "system";
    int i = 0;
    while (new_str[i] != '\0')
    {
        str[i] = new_str[i];
        i++;
    }
    str[i] = '\0';
}
int main()
{
    char str[] = "hello";
    printf("before :%s\n", str);
    update_str(str);
    printf("after: %s\n", str);
    return 0;
}