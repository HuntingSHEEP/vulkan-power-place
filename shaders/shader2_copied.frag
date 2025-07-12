#version 450
layout(binding = 1) uniform sampler2D texSampler;

layout(push_constant) uniform Push {
    vec3 position;
    vec3 color;
} push;


layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 cameraPosition;
layout(location = 4) in vec3 fragPosition;

layout(location = 0) out vec4 outColor;

void main() {

    vec3 normalizedNormal = normalize(normal);
    vec3 lightColor = vec3(0.5, 0.3, 0.15);
    vec3 material = vec3(1., 1., 1.);

    vec3 pointLightPosition = push.position; 
    vec3 fragmentToLight_vector = pointLightPosition - fragPosition;
    vec3 fragmentToLight_normalized = normalize(pointLightPosition - fragPosition);

    float Ia = 1;
    float ka = 0.3;
    float Ip = 1.0;
    float kd = 0.7;

    float dl = length(fragmentToLight_vector);
    float c1 = 0.1;
    float c2 = 0.2;
    float c3 = 0.4;

    float fatt = min(1./(c1 + c2*dl + c3*dl*dl), 1.);

    vec3 I = lightColor * Ia*ka + Ip*kd*fatt * max(dot(normalizedNormal, fragmentToLight_normalized), 0.); 

    outColor = vec4(material * I, 1.0);

    //outColor = vec4(material * I, 1.0) * texture(texSampler, fragTexCoord);

}
