
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.entities.User;
import static spark.Spark.*;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;

public class Main extends ListenerAdapter {
    private static JDA jda;
    private static final Gson gson = new Gson();

    public static void main(String[] args) {
        String token = "MTM3NTIyMjMyNjE0ODQ2NDcyMQ.GOjT3R.WliV1JlcNQrwizJsgZDMKzanVX1IIOe_AkR-TU"; // Replace with your bot token
        if (token.equals("MTM3NTIyMjMyNjE0ODQ2NDcyMQ.GOjT3R.WliV1JlcNQrwizJsgZDMKzanVX1IIOe_AkR-TU")) {
            System.out.println("Please update the token in the code");
            return;
        }

        jda = JDABuilder.createDefault(token)
            .addEventListeners(new Main())
            .build();

        jda.upsertCommand("userinfo", "Get information about a user")
            .addOption(OptionType.STRING, "userid", "The ID of the user", true)
            .queue();

        // Set up web API endpoint
        ipAddress("0.0.0.0");
        port(5000);

        get("/api/user/:userId", (request, response) -> {
            response.type("application/json");
            String userId = request.params(":userId");
            
            try {
                User user = jda.retrieveUserById(userId).complete();
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("name", user.getName());
                userInfo.put("tag", user.getAsTag());
                userInfo.put("avatarUrl", user.getEffectiveAvatarUrl());
                userInfo.put("isBot", user.isBot());
                userInfo.put("created", user.getTimeCreated().toString());
                
                return gson.toJson(userInfo);
            } catch (Exception e) {
                response.status(404);
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found");
                return gson.toJson(error);
            }
        });
    }

    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
        if (event.getName().equals("userinfo")) {
            String userId = event.getOption("userid").getAsString();
            try {
                User user = event.getJDA().retrieveUserById(userId).complete();
                event.reply("User Info:\n" +
                    "Name: " + user.getName() + "\n" +
                    "Tag: " + user.getAsTag() + "\n" +
                    "Avatar URL: " + user.getEffectiveAvatarUrl() + "\n" +
                    "Bot: " + user.isBot() + "\n" +
                    "Created: " + user.getTimeCreated())
                    .queue();
            } catch (Exception e) {
                event.reply("Could not find user with ID: " + userId).queue();
            }
        }
    }
}
