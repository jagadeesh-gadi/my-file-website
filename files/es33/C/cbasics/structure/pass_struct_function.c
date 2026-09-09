#include<stdio.h>

typedef struct{
	int id;
	float temp;

}sensor_t;

void display_pass(sensor_t s)
{
	printf("sensor id :: %d\n",s.id);
	printf("temp value :: %f\n",s.temp);

}

void ponter_value(sensor_t *s){
    s->temp = 90.0;
    printf("temp values :: %f\n",s->temp);



}
void pointer_const(const sensor_t *s){
 printf("temp value:: %f\n",s->temp);
// s->temp =90;
}	
int main(){

	sensor_t s = {101,80.90};

	display_pass(s);

	ponter_value(&s);
        printf("temp values :: %f\n",s.temp);
	ponter_value(&s);

	return 0;
}
