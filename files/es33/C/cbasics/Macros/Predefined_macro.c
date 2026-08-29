// useed to find the data and time and which line was provied in __LINE__ and the ,which file it was provied it will disply
#include <stdio.h>

int main()
{
    printf("%s\n", __FILE__);
    printf("%d\n", __LINE__);
    printf("%s\n", __TIME__);
    printf("%s\n", __DATE__);
    return 0;
}